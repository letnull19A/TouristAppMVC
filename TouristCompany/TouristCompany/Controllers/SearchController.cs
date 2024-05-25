using Microsoft.AspNetCore.Mvc;
using TouristCompany.Services;

namespace TouristCompany.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController(ISearchService searchService) : ControllerBase
{
    [HttpGet()]
    public async Task<IActionResult> SearchTickets(
        [FromQuery] string name,
        [FromQuery] string description,
        [FromQuery] int airportId,
        [FromQuery] int passengers,
        [FromQuery] DateTime departureDate,
        [FromQuery] int destinationCountryId)
    {
        var tickets = await searchService.SearchTicketsAsync(name, description, airportId, passengers, departureDate, destinationCountryId);
        return Ok(tickets);
    }
}