using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Menudo.Infrastructure.Persistence
{
    public class MenudoDbContextFactory : IDesignTimeDbContextFactory<MenudoDbContext>
    {
        public MenudoDbContext CreateDbContext(string[] args)
        {
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "Menudo.Presentation");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<MenudoDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new MenudoDbContext(optionsBuilder.Options);
        }
    }
}