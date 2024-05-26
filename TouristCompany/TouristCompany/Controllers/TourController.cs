using Microsoft.AspNetCore.Mvc;
using Mapster;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.DTOs.Tour;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/tour")]
    public class TourController(
        IRepository<Tour> tourRepository,
        IRepository<Country> countryRepository,
        IRepository<Category> categoryRepository,
        IRepository<City> cityRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllTours()
        {
            var tours = tourRepository.GetAll();
            var countries = countryRepository.GetAll();
            var cities = cityRepository.GetAll();
            var categories = categoryRepository.GetAll();

            var result = tours.Join(countries, u => u.CountryId, v => v.Id, (u, v) => new
            {
                Id = u.Id,
                Name = u.Name,
                Description = u.Description,
                CategoryId = u.CategoryId,
                CityId = u.CityId,
                ImageUrl = u.ImageUrl,
                Country = v.Adapt<CountryLiteDto>()
            }).Join(cities, t => t.CityId, p => p.Id, (t, p) => new
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                Country = t.Country,
                ImageUrl = t.ImageUrl,
                CategoryId = t.CategoryId,
                City = p.Adapt<CityLiteDto>()
            }).Join(categories, w => w.CategoryId, q => q.Id, (w, q) => new
            {
                w.Id,
                w.Description,
                w.Name,
                w.Country,
                w.City,
                w.ImageUrl,
                Category = categoryRepository.GetById(w.CategoryId).Adapt<CategoryLiteDto>()
            });

            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetTourById(Guid id)
        {
            var tour = tourRepository.GetById(id);
            var city = cityRepository.GetById(tour.CityId);
            var country = countryRepository.GetById(tour.CountryId);
            var category = categoryRepository.GetById(tour.CategoryId);

            var result = new
            {
                Id = tour.Id,
                Name = tour.Name,
                Description = tour.Description,
                Category = category.Adapt<CategoryLiteDto>(),
                Country = country.Adapt<CountryLiteDto>(),
                ImageUrl = tour.ImageUrl,
                City = city.Adapt<CityLiteDto>()
            };

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddTour([FromBody] TourCreationDto tourDto)
        {
            var tour = tourDto.Adapt<Tour>();

            tourRepository.Insert(tour);
            return CreatedAtAction(nameof(GetTourById), new { id = tour.Id }, tour);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateTour(Guid id, [FromBody] TourUpdateDto tour)
        {
            var currentTour = tourRepository.GetById(id);

            currentTour.CountryId = tour.CountryId;
            currentTour.CityId = tour.CityId;
            currentTour.CategoryId = tour.CategoryId;
            currentTour.Description = tour.Description;
            currentTour.Name = tour.Name;

            tourRepository.Update(currentTour);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteTour(Guid id)
        {
            tourRepository.Delete(id);
            return NoContent();
        }
    }
}