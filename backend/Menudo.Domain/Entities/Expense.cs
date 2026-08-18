using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date {  get; set; }
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int PaymentMethodId { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }


        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
