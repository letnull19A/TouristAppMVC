namespace TouristCompany.Models.DTOs;

public class OrderCreationDto
{
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
    public Guid TourPriceId { get; set; }
}