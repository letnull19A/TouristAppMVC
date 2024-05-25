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
    Task<IEnumerable<TicketDto>> SearchTicketsAsync(string name, string description, int airportId, int passengers, DateTime departureDate, int destinationCountryId);
}

public class SearchService : ISearchService
{
    private readonly TicketService _ticketService;

    public SearchService(TicketService ticketService)
    {
        _ticketService = ticketService;
    }

    public async Task<IEnumerable<TicketDto>> SearchTicketsAsync(string name, string description, int airportId, int passengers, DateTime departureDate, int destinationCountryId)
    {
        var tickets = await _ticketService.GetTicketsAsync();

        var filteredTickets = tickets
            .Where(t => (airportId == 0 || t.AirportId == airportId) &&
                        (destinationCountryId == 0 || t.CountryDestination == destinationCountryId) &&
                        (departureDate == DateTime.MinValue || t.DateOfDeparture == new DateTimeOffset(departureDate).ToUnixTimeMilliseconds()))
            .Select(t => new TicketDto
            {
                Id = t.Id,
                AirportId = t.AirportId,
                Price = t.Price,
                CountryDestination = t.CountryDestination,
                DateOfDeparture = t.DateOfDeparture,
                DateOfArrival = t.DateOfArrival
            });

        return filteredTickets;
    }
}