using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.HotelTour;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

[Route($"api/favourite/{{userId:guid}}")]
[ApiController]
public class FavouriteController(IRepository<Favourite> favouriteRepository) : ControllerBase
{
    [HttpGet]
    public IActionResult GetById(Guid userId)
    {
        var result = favouriteRepository.GetAll().Where(i => i.UserId == userId).ToList();
        return Ok(result);
    }

    [HttpPost("{tourId:guid}")]
    public IActionResult Create(Guid userId, Guid tourId)
    {
        var favourite = new Favourite()
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            TourId = tourId
        };
        
        favouriteRepository.Insert(favourite);

        return Ok(favourite);
    }

    [HttpDelete("{tourId:guid}")]
    public IActionResult Delete(Guid userId, Guid tourId)
    {
        var favouriteItem = favouriteRepository.GetAll().FirstOrDefault(u => u.UserId == userId && tourId == u.TourId);

        if (favouriteItem == null) return NotFound();
        
        favouriteRepository.Delete(favouriteItem.Id);

        return Ok();
    }
}