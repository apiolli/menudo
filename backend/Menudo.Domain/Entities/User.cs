namespace Menudo.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public List<Category> Categories { get; set; } = [];
    public List<Expense> Expenses { get; set; } = [];
    public List<PaymentMethod> PaymentMethods { get; set; } = [];
}
