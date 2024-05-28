using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class FavouriteRepository(DbContext context, DbSet<Favourite> dbSet) : BaseRepository<Favourite>(context, dbSet);