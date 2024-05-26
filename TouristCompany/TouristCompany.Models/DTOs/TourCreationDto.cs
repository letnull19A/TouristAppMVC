namespace TouristCompany.Models.DTOs;

public sealed class TourCreationDto : BaseDto
{
    public Guid CategoryId { get; set; }
    public Guid CityId { get; set; }
    public Guid CountryId { get; set; }
    public string ImageUrl { get; set; }
}