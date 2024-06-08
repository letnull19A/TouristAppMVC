namespace TouristCompany.Models.DTOs;

public class AttractionCreationDto : BaseDto
{
    public Guid CityId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}