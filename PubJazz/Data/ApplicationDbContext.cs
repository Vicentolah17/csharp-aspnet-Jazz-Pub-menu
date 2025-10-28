using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PubJazz.Models;
using PubJazz.Pages;

namespace PubJazz.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet <Client> Clients { get; set; } = default!;
    public DbSet <Premium> Premiums { get; set; } = default!;

}
