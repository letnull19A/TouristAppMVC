using Mapster;
using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

[Route("api/orders")]
[ApiController]
public class OrderController(
    IRepository<Order> orderRepository,
    IRepository<TourPrice> tourPriceRepository,
    IRepository<Tour> tourRepository,
    IRepository<Country> countryRepository,
    IRepository<Category> categoryRepository,
    IRepository<City> cityRepository)
    : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(orderRepository.GetAll());
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(orderRepository.GetById(id));
    }

    [HttpGet("user/{id:guid}")]
    public IActionResult GetOrderUser(Guid id)
    {
        var tours = tourRepository.GetAll();
        var countries = countryRepository.GetAll();
        var cities = cityRepository.GetAll();
        var categories = categoryRepository.GetAll();
        var orders = orderRepository.GetAll();
        var readyOrders = orders.Where(y => y.UserId == id).ToList();

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
        }).Join(readyOrders, o => o.Id, u => u.TourId, (o, u) => new
        {
            o.Id, 
            o.City,
            o.Country,
            o.Description, 
            o.ImageUrl,
            o.Category,
            o.Name,
            u.Date,
            u.Status
        });

        return Ok(result);
    }

    [HttpPost]
    public IActionResult Create([FromBody] OrderCreationDto form)
    {
        var entity = new Order
        {
            UserId = form.UserId,
            Date = form.Date.ToString(),
            TourPriceId = form.TourPriceId,
            TourId = tourPriceRepository.GetAll().First(o => o.Id == form.TourPriceId).TourId,
            Status = "AWAIT",
            Id = Guid.NewGuid()
        };

        orderRepository.Insert(entity);

        return Ok(entity);
    }

    [HttpPut("{id:guid}/status/{status}")]
    public IActionResult CancelOrder(Guid id, string status)
    {
        var t = orderRepository.GetById(id);

        t.Status = status;

        orderRepository.Update(t);

        return Ok(t);
    }
}