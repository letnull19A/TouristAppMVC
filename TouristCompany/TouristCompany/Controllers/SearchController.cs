using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    private async Task<List<Ticket>> GetAllTickets()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/tickets");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<Ticket>>(request)).Data;
    }

    private async Task<List<CountryFromApi>> GetAllCounties()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/countries");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<CountryFromApi>>(request)).Data;
    }

    private List<Ticket> GetTicketsByAirportId(int id)
    {
        var tickets = GetAllTickets().Result;

        return tickets.Where(i => i.AirportId == id).ToList();
    }

    private async Task<List<Airport>> GetAllAirports()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/airports");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<Airport>>(request)).Data;
    }
}