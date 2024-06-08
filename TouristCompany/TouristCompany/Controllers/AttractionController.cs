using Microsoft.AspNetCore.Mvc;
using Mapster;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Attraction;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/attraction")]
    public class AttractionController(
        IRepository<Attraction> attractionRepository,
        IRepository<City> cityRepository,
        IRepository<Country> countryRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllAttractions()
        {
            var attractions = attractionRepository.GetAll();
            var cities = cityRepository.GetAll();
            var countries = countryRepository.GetAll();

            var result = cities.Join(attractions, city => city.Id, attraction => attraction.CityId,
                (city, attraction) => new
                {
                    attraction.Id,
                    attraction.Name,
                    attraction.Description,
                    attraction.ImageUrl,
                    City = city
                }).Join(countries, r => r.City.CountryId, u => u.Id, (r, u) => new
            {
                r.Id,
                r.Name,
                r.Description,
                r.ImageUrl,
                City = r.City.Adapt<CityLiteDto>(),
                Country = u.Adapt<CountryLiteDto>()
            }).ToList();

            return Ok(result);
        }

        [HttpGet("/city/{cityId:guid}")]
        public IActionResult GetAttractionsFromCity(Guid cityId)
        {
            var attractions = attractionRepository.GetAll();
            var cities = cityRepository.GetAll();
            var countries = countryRepository.GetAll();

            var result = cities.Join(attractions, city => city.Id, attraction => attraction.CityId,
                (city, attraction) => new
                {
                    attraction.Id,
                    attraction.Name,
                    attraction.Description,
                    attraction.ImageUrl,
                    City = city
                }).Join(countries, r => r.City.CountryId, u => u.Id, (r, u) => new
            {
                r.Id,
                r.Name,
                r.Description,
                r.ImageUrl,
                City = r.City.Adapt<CityLiteDto>(),
                Country = u.Adapt<CountryLiteDto>()
            }).Where(t => t.City.Id == cityId).ToList();

            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetAttractionById(Guid id)
        {
            var attraction = attractionRepository.GetById(id);
            var city = cityRepository.GetById(attraction.CityId);
            var country = countryRepository.GetById(city.CountryId);

            var result = new
            {
                Id = attraction.Id,
                Name = attraction.Name,
                Description = attraction.Description,
                ImageUrl = attraction.ImageUrl,
                City = city.Adapt<CityLiteDto>(),
                Country = country.Adapt<CountryLiteDto>()
            };

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddAttraction([FromBody] AttractionCreationDto attractionDto)
        {
            var attraction = attractionDto.Adapt<Attraction>();

            attractionRepository.Insert(attraction);
            return CreatedAtAction(nameof(GetAttractionById), new { id = attraction.Id }, attraction);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateAttraction([FromQuery] Guid id, [FromBody] AttractionUpdateDto attraction)
        {
            var attractionCommit = new Attraction()
            {
                Id = id,
                Name = attraction.Name,
                Description = attraction.Description,
                CityId = attraction.CityId
            };

            attractionRepository.Update(attractionCommit);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteAttraction(Guid id)
        {
            attractionRepository.Delete(id);
            return NoContent();
        }
    }
}