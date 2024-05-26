using Microsoft.AspNetCore.Http.HttpResults;
using TouristCompany.Models.Entities.TicketService;

namespace TouristCompany.Services;

public class TicketDto
{
    public int Id { get; set; }
    public int AirportId { get; set; }
    public int Price { get; set; }
    public int CountryDestination { get; set; }
    public long DateOfDeparture { get; set; }
    public long DateOfArrival { get; set; }
}

public interface ISearchService
{
    Task<IEnumerable<TicketDto>> SearchTicketsAsync(string name, string description, int airportId, int passengers,
        DateTime departureDate, int destinationCountryId);
}

public class SearchService(TicketService ticketService) : ISearchService
{
    public async Task<IEnumerable<TicketDto>> SearchTicketsAsync(string name, string description, int airportId,
        int passengers, DateTime departureDate, int destinationCountryId)
    {
        var tickets = await ticketService.GetTicketsAsync();
        
        var filteredTickets = tickets
            .Where(t => (airportId == 1 || t.AirportId == airportId) &&
                        (destinationCountryId == 1 || t.CountryDistanation == destinationCountryId) &&
                        (departureDate == DateTime.MinValue || t.DateOfDeparture ==
                            new DateTimeOffset(departureDate).ToUnixTimeMilliseconds()))
            .Select(t => new TicketDto
            {
                Id = t.Id,
                AirportId = t.AirportId,
                Price = t.Price,
                CountryDestination = t.CountryDistanation,
                DateOfDeparture = t.DateOfDeparture,
                DateOfArrival = t.DateOfArrival
            });

        return filteredTickets;
    }
}