using Mapster;
using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.City;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/city")]
    public class CityController(IRepository<City> cityRepository, IRepository<Country> countryRepository)
        : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllCities()
        {
            var cities = cityRepository.GetAll();
            var countries = countryRepository.GetAll();

            var result = cities.Join(countries, city => city.CountryId, country => country.Id,
                (cities, countries) => new
                {
                    cities.Id,
                    cities.Name,
                    cities.Description,
                    Country = new
                    {
                        Id = countries.Id,
                        Name = countries.Name,
                        Description = countries.Description
                    } 
                }).ToList();

            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetCityById(Guid id)
        {
            var city = cityRepository.GetById(id);

            var country = countryRepository.GetById(city.CountryId);

            return Ok(new
            {
                city.Id,
                city.Name,
                city.Description,
                Country = new
                {
                    Id = country.Id,
                    Name = country.Name,
                    Description = country.Description
                }
            });
        }

        [HttpPost]
        public IActionResult AddCity([FromBody] CityCreationDto cityDto)
        {
            var city = cityDto.Adapt<City>();
            city.CountryId = countryRepository.GetById(city.CountryId).Id;

            cityRepository.Insert(city);
            return CreatedAtAction(nameof(GetCityById), new { id = city.Id }, city);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateCity(Guid id, CityUpdateDto city)
        {
            var cityForUpdate = cityRepository.GetById(id);
            cityForUpdate.CountryId = city.CountryId;
            cityForUpdate.Description = city.Description;
            cityForUpdate.Name = city.Name;
            
            cityRepository.Update(cityForUpdate);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteCity(Guid id)
        {
            cityRepository.Delete(id);
            return NoContent();
        }
    }
}