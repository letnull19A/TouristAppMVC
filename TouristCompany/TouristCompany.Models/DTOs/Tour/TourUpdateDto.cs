namespace TouristCompany.Models.DTOs.Tour;

public sealed class TourUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Guid CityId { get; set; }
    public Guid CountryId { get; set; }
    public Guid CategoryId { get; set; }
    public string ImageUrl { get; set; }
}