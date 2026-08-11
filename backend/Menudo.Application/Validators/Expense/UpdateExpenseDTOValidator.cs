using FluentValidation;
using Menudo.Application.DTOs.Expense;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Validators.Expense
{
    public class UpdateExpenseDTOValidator : AbstractValidator<UpdateExpenseDTO>
    {
        public UpdateExpenseDTOValidator()
        {
            RuleFor(c => c.Amount)
                .NotEmpty().WithMessage("El monto del gasto es obligatorio.")
                .GreaterThan(0).WithMessage("El monto debe ser mayor a 0.");

            RuleFor(c => c.Date)
                .NotEmpty().WithMessage("La fecha del gasto es obligatoria.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage($"La fecha del gasto debe de ser igual o menor que {DateTime.Now.ToShortDateString()}.");

            RuleFor(c => c.Description)
                .NotEmpty().WithMessage("La descripcion del gasto es obligatoria.")
                .MinimumLength(3).WithMessage("La descripcion debe de tener un minimo de 3 caracteres.");

            RuleFor(c => c.CategoryId)
                .NotEmpty().WithMessage("La categoria del gasto es obligatoria.");

            RuleFor(c => c.PaymentMethodId)
                .NotEmpty().WithMessage("El metodo de pago del gasto es obligatorio.");
        }
    }
}
