using TouristCompany.Models.Entities.TicketService;
using Newtonsoft.Json;

namespace TouristCompany.Services;

public class TicketService(HttpClient httpClient)
{
    public async Task<IEnumerable<Country>> GetCountriesAsync()
    {
        var response = await httpClient.GetAsync("/countries");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<IEnumerable<Country>>(json);
    }

    public async Task<IEnumerable<Airport>> GetAirportsAsync()
    {
        var response = await httpClient.GetAsync("/airports");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<IEnumerable<Airport>>(json);
    }

    public async Task<IEnumerable<Ticket>> GetTicketsAsync()
    {
        var response = await httpClient.GetAsync("/tickets");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<IEnumerable<Ticket>>(json);
    }
}