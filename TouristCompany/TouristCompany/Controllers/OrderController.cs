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
    IRepository<User> userRepository,
    IRepository<City> cityRepository)
    : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        var orders = orderRepository.GetAll();
        var tours = tourRepository.GetAll();
        var users = userRepository.GetAll();
        var toursAndPrices = tourPriceRepository.GetAll();
        var cities = cityRepository.GetAll();
        var countries = countryRepository.GetAll();

        var result = orders.Join(tours, o => o.TourId, k => k.Id, (o, k) => new
        {
            Tour = tourRepository.GetById(o.TourId),
            OrderDate = o.Date,
            OrderId = o.Id,
            OrderStatus = o.Status,
            o.UserId,
            o.TourPriceId,
        }).Join(users, m => m.UserId, n => n.Id, (m, n) => new
        {
            Tour = m.Tour,
            User = n,
            Order = new
            {
                Date = m.OrderDate,
                Status = m.OrderStatus,
                Id = m.OrderId,
                m.TourPriceId
            }
        }).Join(toursAndPrices, h => h.Order.TourPriceId, v => v.Id, (h, v) => new
        {
            Tour = h.Tour,
            User = h.User,
            Order = new
            {
                Id = h.Order.Id,
                Status = h.Order.Status,
                Date = h.Order.Date,
            },
            TourPrice = new
            {
                v.Id,
                v.Days,
                v.Price
            }
        }).Join(cities, e => e.Tour.CityId, n => n.Id, (e, n) => new
        {
            Tour = e.Tour,
            User = e.User,
            Order = e.Order,
            TourPrice = e.TourPrice,
            City = new
            {
                n.Id,
                n.Name,
                n.Description,
                n.CountryId
            }
        }).Join(countries, d => d.City.CountryId, c => c.Id, (d, c) => new
        {
            Tour = new
            {
                Id = d.Tour.Id,
                Name = d.Tour.Name,
                Description = d.Tour.Description,
                ImageUrl = d.Tour.ImageUrl
            },
            User = d.User,
            Order = d.Order,
            TourPrice = d.TourPrice,
            City = d.City,
            Country = new
            {
                c.Id,
                c.Name,
                c.Description
            }
        });

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(orderRepository.GetById(id));
    }

    [HttpGet("user/{id:guid}")]
    public IActionResult GetOrderUser(Guid id)
    {
        var orders = orderRepository.GetAll();
        var tours = tourRepository.GetAll();
        var users = userRepository.GetAll();
        var toursAndPrices = tourPriceRepository.GetAll();
        var cities = cityRepository.GetAll();
        var countries = countryRepository.GetAll();

        var result = orders.Join(tours, o => o.TourId, k => k.Id, (o, k) => new
        {
            Tour = tourRepository.GetById(o.TourId),
            OrderDate = o.Date,
            OrderId = o.Id,
            OrderStatus = o.Status,
            o.UserId,
            o.TourPriceId,
        }).Join(users, m => m.UserId, n => n.Id, (m, n) => new
        {
            Tour = m.Tour,
            User = n,
            Order = new
            {
                Date = m.OrderDate,
                Status = m.OrderStatus,
                Id = m.OrderId,
                m.TourPriceId
            }
        }).Join(toursAndPrices, h => h.Order.TourPriceId, v => v.Id, (h, v) => new
        {
            Tour = h.Tour,
            User = h.User,
            Order = new
            {
                Id = h.Order.Id,
                Status = h.Order.Status,
                Date = h.Order.Date,
            },
            TourPrice = new
            {
                v.Id,
                v.Days,
                v.Price
            }
        }).Join(cities, e => e.Tour.CityId, n => n.Id, (e, n) => new
        {
            Tour = e.Tour,
            User = e.User,
            Order = e.Order,
            TourPrice = e.TourPrice,
            City = new
            {
                n.Id,
                n.Name,
                n.Description,
                n.CountryId
            }
        }).Join(countries, d => d.City.CountryId, c => c.Id, (d, c) => new
        {
            Tour = new
            {
                Id = d.Tour.Id,
                Name = d.Tour.Name,
                Description = d.Tour.Description,
                ImageUrl = d.Tour.ImageUrl
            },
            User = d.User,
            Order = d.Order,
            TourPrice = d.TourPrice,
            City = d.City,
            Country = new
            {
                c.Id,
                c.Name,
                c.Description
            }
        }).Where(o => o.User.Id == id).ToList();

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