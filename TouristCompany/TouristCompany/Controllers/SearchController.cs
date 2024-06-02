using Mapster;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

public class Ticket
{
    public int Id { get; set; }
    public int AirportId { get; set; }
    public int CountryDistanation { get; set; }
    public long DateOfDeparture { get; set; }
}

public class CountryFromApi
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class Airport
{
    public int Id { get; set; }
    public int CountryId { get; set; }
    public string City { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

[ApiController]
[Route("/api/search")]
public class SearchController(
    IConfiguration configuration,
    IRepository<Tour> tourRepository,
    IRepository<Country> countryRepository,
    IRepository<City> cityRepository,
    IRepository<TourPrice> tourPriceRepository,
    IRepository<Category> categoryRepository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Search(string? search)
    {
        var tours = tourRepository.GetAll();
        var countries = countryRepository.GetAll();
        var cities = cityRepository.GetAll();
        var categories = categoryRepository.GetAll();

        var result = tours.Join(countries, u => u.CountryId, v => v.Id, (u, v) => new
        {
            Id = u.Id,
            Name = u.Name,
            Description = u.Description,
            CategoryId = u.CategoryId,
            CityId = u.CityId,
            ImageUrl = u.ImageUrl,
            Country = v.Adapt<CountryLiteDto>()
        }).Join(cities, t => t.CityId, p => p.Id, (t, p) => new
        {
            Id = t.Id,
            Name = t.Name,
            Description = t.Description,
            Country = t.Country,
            ImageUrl = t.ImageUrl,
            CategoryId = t.CategoryId,
            City = p.Adapt<CityLiteDto>()
        }).Join(categories, w => w.CategoryId, q => q.Id, (w, q) => new
        {
            w.Id,
            w.Description,
            w.Name,
            w.Country,
            w.City,
            w.ImageUrl,
            Category = categoryRepository.GetById(w.CategoryId).Adapt<CategoryLiteDto>()
        }).ToList();

        if (string.IsNullOrEmpty(search))
        {
            return Ok(result);
        }

        var prepairedSearch = search.ToLower();

        var searchResult = result.Where(o =>
            o.Description.ToLower().Contains(prepairedSearch) ||
            o.Description.ToLower().StartsWith(prepairedSearch) ||
            o.Description.ToLower().EndsWith(prepairedSearch) ||
            o.Name.ToLower().Contains(prepairedSearch) ||
            o.Name.ToLower().StartsWith(prepairedSearch) ||
            o.Name.ToLower().EndsWith(prepairedSearch));

        return Ok(searchResult);
    }

    [HttpPost("filter")]
    public IActionResult Filter(string? search, int days, string countryName, DateTime date)
    {
        var tours = tourRepository.GetAll();
        var countries = countryRepository.GetAll();
        var cities = cityRepository.GetAll();
        var categories = categoryRepository.GetAll();
        var tourPrice = tourPriceRepository.GetAll();

        var result = tours.Join(countries, u => u.CountryId, v => v.Id, (u, v) => new
        {
            Id = u.Id,
            Name = u.Name,
            Description = u.Description,
            CategoryId = u.CategoryId,
            CityId = u.CityId,
            ImageUrl = u.ImageUrl,
            Country = v.Adapt<CountryLiteDto>()
        }).Join(cities, t => t.CityId, p => p.Id, (t, p) => new
        {
            Id = t.Id,
            Name = t.Name,
            Description = t.Description,
            Country = t.Country,
            ImageUrl = t.ImageUrl,
            CategoryId = t.CategoryId,
            City = p.Adapt<CityLiteDto>()
        }).Join(categories, w => w.CategoryId, q => q.Id, (w, q) => new
        {
            w.Id,
            w.Description,
            w.Name,
            w.Country,
            w.City,
            w.ImageUrl,
            Category = categoryRepository.GetById(w.CategoryId).Adapt<CategoryLiteDto>(),
            TourPriceDays = tourPrice.Where(r => r.TourId == w.Id).Select(p => p.Days)
        }).ToList();

        var filterByDays = result
            .Where(w => w.TourPriceDays.Contains(days) && w.TourPriceDays.Any()).ToList();

        var filterByCountryName = filterByDays
            .Where(o =>
                string.Equals(o.Country.Name, countryName, StringComparison.CurrentCultureIgnoreCase))
            .ToList();

        var tickets = GetAllTickets();
        var countriesList = GetAllCounties();
        var airports = GetAllAirports();

        var result1 = countriesList
            .Join(tickets, i => i.Id, g => g.CountryDistanation, (i, g) => new
            {
                TicketId = g.Id,
                TicketAirportId = g.AirportId,
                CountryId = i.Id,
                CountryName = i.Name,
            }).ToList();

        var result2 = airports.Select(p => new
            {
                AirportId = p.Id,
                AirportCity = p.City,
                AirportName = p.Name,
                AirportLabel = p.City + ", " + p.Name,
                Tickets = tickets.Where(w => w.AirportId == p.Id)
                    .Join(countriesList, k => k.CountryDistanation, s => s.Id, (k, s) => new
                    {
                        CountryName = s.Name,
                        CountryId = s.Id,
                        DateOfDeparture = k.DateOfDeparture,
                        Date = new DateTime(1970, 1, 1)
                            .AddMilliseconds(k.DateOfDeparture)
                    }).ToList()
            }).Select(q =>
                q.Tickets.Where(r => r.CountryName == countryName))
            .ToList();

        var result3 = result2
            .Select(t =>
                t.Where(o => o.Date == date).Any())
            .Any(u => u);

        if (!result3) return NotFound("Туров на подходящие параметры не найдены");
        
        if (string.IsNullOrEmpty(search))
        {
            return Ok(filterByCountryName);
        }

        var prepairedSearch = search.ToLower();
        
        var searchResult = filterByCountryName.Where(o =>
            o.Description.ToLower().Contains(prepairedSearch) ||
            o.Description.ToLower().StartsWith(prepairedSearch) ||
            o.Description.ToLower().EndsWith(prepairedSearch) ||
            o.Name.ToLower().Contains(prepairedSearch) ||
            o.Name.ToLower().StartsWith(prepairedSearch) ||
            o.Name.ToLower().EndsWith(prepairedSearch));

        if (!searchResult.Any()) return NotFound("Подходящие туры не найдены");
        
        return Ok(searchResult);
    }

    [HttpGet("/tickets")]
    public IActionResult GetAllTicketsApi()
    {
        return Ok(GetAllTickets());
    }

    [HttpGet("/countries")]
    public IActionResult GetAllCountries()
    {
        return Ok(GetAllCounties());
    }

    [HttpGet("/airport")]
    public IActionResult GetAllAirportsApi()
    {
        return Ok(GetAllAirports());
    }

    private List<Ticket> GetAllTickets()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + "/tickets");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        var response = client.ExecuteAsync<List<Ticket>>(request).Result;

        return response.Data ?? [];
    }

    private List<CountryFromApi> GetAllCounties()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + "/countries");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        var response = client.ExecuteAsync<List<CountryFromApi>>(request).Result;

        return response.Data ?? [];
    }

    private List<Ticket> GetTicketsByAirportId(int id)
    {
        var tickets = GetAllTickets();

        return tickets.Where(i => i.AirportId == id).ToList();
    }

    private List<Airport> GetAllAirports()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + "/airports");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        var response = client.ExecuteAsync<List<Airport>>(request).Result;

        return response.Data ?? [];
    }
}