using System.Text;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.Entities;
using TouristCompany.Services;

namespace TouristCompany.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController(
    ISearchService searchService,
    TicketService ticketService,
    IRepository<Tour> tourRepository,
    IRepository<Country> countryRepository,
    IRepository<TourPrice> tourPriceRepository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> SearchTickets(string search, long dateOfDeparture, int persons)
    {
        var tickets = await ticketService.GetTicketsAsync();
        var countries = await ticketService.GetCountriesAsync();
        var airports = await ticketService.GetAirportsAsync();

        var encodedSeearch = HttpUtility.UrlDecode(search, Encoding.UTF8);

        var s = countries.Join(airports, i => i.Id, o => o.CountryId, (i, o) => new
        {
            CountryId = i.Id,
            CountryName = i.Name,
            AirportCountryId = o.CountryId,
            AirportName = o.Name,
            AirportCity = o.City,
            AirportId = o.Id
        });

        var t = s.Join(
            tickets,
            u => u.AirportId,
            v => v.AirportId,
            (u, v) => new
            {
                AirportId = u.AirportId,
                AirportName = u.AirportName,
                AirportCity = u.AirportCity,
                AirportCountryId = u.AirportCountryId,
                CountryId = u.CountryId,
                CountryName = u.CountryName,
                TicketAirportId = v.AirportId,
                TicketId = v.Id,
                TicketPrice = v.Price,
                TicketCountryDestination = v.CountryDistanation,
                TicketCountryDestinationName = countries.First(x => x.Id == v.CountryDistanation).Name,
                TicketDateOfDeparture = v.DateOfDeparture,
                TicketDateOfArrival = v.DateOfArrival
            });

        var q = countryRepository
            .GetAll()
            .Join(t,
                w => w.Name,
                c => c.TicketCountryDestinationName,
                (w, c) => new
                {
                    TourCountryId = w.Id,
                    TourCountryName = w.Name,
                    TourCountryDescription = w.Description,
                    TourCountryImage = w.ImageUrl,
                    AirportId = c.AirportId,
                    AirportName = c.AirportName,
                    AirportCity = c.AirportCity,
                    AirportCountryId = c.AirportCountryId,
                    CountryId = c.CountryId,
                    CountryName = c.CountryName,
                    TicketAirportId = c.AirportId,
                    TicketId = c.TicketId,
                    TicketPrice = c.TicketPrice,
                    TicketCountryDestination = c.TicketCountryDestination,
                    TicketCountryDestinationName = c.TicketCountryDestinationName,
                    TicketDateOfDeparture = c.TicketDateOfDeparture,
                    TicketDateOfArrival = c.TicketDateOfArrival
                });

        var b = q.Join(
            tourRepository.GetAll(),
            f => f.TourCountryId,
            z => z.CountryId,
            (f, z) => new
            {
                TourCountryId = f.TourCountryId,
                TourCountryName = f.TourCountryName,
                TourCountryDescription = f.TourCountryDescription,
                TourCountryImage = f.TourCountryImage,
                AirportId = f.AirportId,
                AirportName = f.AirportName,
                AirportCity = f.AirportCity,
                AirportCountryId = f.AirportCountryId,
                CountryId = f.CountryId,
                CountryName = f.CountryName,
                TicketAirportId = f.AirportId,
                TicketId = f.TicketId,
                TicketPrice = f.TicketPrice,
                TicketCountryDestination = f.TicketCountryDestination,
                TicketCountryDestinationName = f.TicketCountryDestinationName,
                TicketDateOfDeparture = f.TicketDateOfDeparture,
                TicketDateOfArrival = f.TicketDateOfArrival,
                aImageUrl = z.ImageUrl,
                aCityId = z.CityId,
                aName = z.Name,
                aDescription = z.Description,
                aCategory = z.CategoryId,
                TourId = z.Id,
                Prices = tourPriceRepository.GetAll().Where(k => k.TourId == z.Id)
            }).Where(g =>
            (g.aName.Contains(encodedSeearch) || g.aDescription.Contains(encodedSeearch)) &&
            g.TicketDateOfDeparture == dateOfDeparture);

        return Ok(b);
    }
}