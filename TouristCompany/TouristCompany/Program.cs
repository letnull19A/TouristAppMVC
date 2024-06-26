using TouristCompany.Contexts;
using TouristCompany.Extensions;
using TouristCompany.Models.Entities;
using TouristCompany.Repositories;
using TouristCompany.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TouristDbContext>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<TicketService>(client =>
{
    client.BaseAddress = new Uri("http://176.123.162.178:7865");
});
builder.Services.AddScoped<ISearchService, SearchService>();
builder.Services.AddSingleton<ISearchService, SearchService>();

builder.Services.AddRepository<User, UserRepository>();
builder.Services.AddRepository<Category, CategoryRepository>();
builder.Services.AddRepository<Attraction, AttractionRepository>();
builder.Services.AddRepository<Hotel, HotelRepository>();
builder.Services.AddRepository<City, CityRepository>();
builder.Services.AddRepository<Country, CountryRepository>();
builder.Services.AddRepository<Tour, TourRepository>();
builder.Services.AddRepository<UserTour, UserTourRepository>();
builder.Services.AddRepository<TourPrice, TourPriceRepository>();
builder.Services.AddRepository<HotelTour, HotelTourRepository>();
builder.Services.AddRepository<Role, RoleRepository>();
builder.Services.AddRepository<Favourite, FavouriteRepository>();
builder.Services.AddRepository<Order, OrderRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", p =>
    {
        p.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

var app = builder.Build();

app.UseCors("CORS");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();