namespace TouristCompany.Models.DTOs.Attraction;

public class AttractionUpdateDto : BaseDto
{
    public Guid CityId { get; set; }
    public Guid CountryId { get; set; }
    public string ImageUrl { get; set; }
}