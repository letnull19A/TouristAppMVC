using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class OrderRepository(DbContext context, DbSet<Order> dbSet) : BaseRepository<Order>(context, dbSet);