using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class CountryRepository(DbContext context, DbSet<Country> dbSet) : BaseRepository<Country>(context, dbSet);