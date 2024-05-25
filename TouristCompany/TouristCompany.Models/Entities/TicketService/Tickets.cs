namespace TouristCompany.Models.Entities.TicketService;

public class Ticket
{
    public int Id { get; set; }
    public int AirportId { get; set; }
    public int Price { get; set; }
    public int CountryDestination { get; set; }
    public long DateOfDeparture { get; set; }
    public long DateOfArrival { get; set; }
}