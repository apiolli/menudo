using Menudo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Infrastructure.Configuration
{
    public class ExpenseConfiguration : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            builder.HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryId);

            builder.HasOne(e => e.PaymentMethod)
                .WithMany(p => p.Expenses)
                .HasForeignKey(e => e.PaymentMethodId);

            builder.Property(e => e.Amount)
                .IsRequired()
                .HasPrecision(10, 2);

            builder.Property(e => e.Date)
                .IsRequired();

            builder.Property(e => e.Description)
                .IsRequired(false)
                .HasMaxLength(100);
                
        }
    }
}
