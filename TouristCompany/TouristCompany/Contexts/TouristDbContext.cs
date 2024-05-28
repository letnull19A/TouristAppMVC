using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;
using File = TouristCompany.Models.Entities.File;

namespace TouristCompany.Contexts
{
    public sealed class TouristDbContext(IConfiguration configuration) : DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Country>? Countries { get; set; }
        public DbSet<City>? Cities { get; set; }
        public DbSet<Attraction>? Attractions { get; set; }
        public DbSet<Hotel>? Hotels { get; set; }
        public DbSet<Tour>? Tours { get; set; }
        public DbSet<UserTour>? UserTours { get; set; }
        public DbSet<Role>? Roles { get; set; }
        public DbSet<TourPrice>? Prices { get; set; }
        public DbSet<HotelTour>? HotelTour { get; set; }
        public DbSet<File>? Files { get; set; }
        public DbSet<Favourite>? Favourites { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetSection("DataBase").Value);
        }
    }
}