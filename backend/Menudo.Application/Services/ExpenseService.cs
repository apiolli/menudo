using AutoMapper;
using FluentValidation;
using Menudo.Application.DTOs.Expense;
using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Exceptions;
using Menudo.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repo;
        private readonly IValidator<CreateExpenseDTO> _createDtoValidator;
        private readonly IValidator<UpdateExpenseDTO> _updateDtoValidator;
        private readonly ICategoryService categoryService;
        private readonly IPaymentMethodService paymentMethodService;
        private readonly IMapper _mapper;

        public ExpenseService(IExpenseRepository repo, IValidator<CreateExpenseDTO> createDtoValidator, 
            IValidator<UpdateExpenseDTO> updateDtoValidator, ICategoryService categoryService, 
            IPaymentMethodService paymentMethodService, IMapper mapper)
        {
            _repo = repo;
            _createDtoValidator = createDtoValidator;
            _updateDtoValidator = updateDtoValidator;
            this.categoryService = categoryService;
            this.paymentMethodService = paymentMethodService;
            _mapper = mapper;
        }

        public async Task<ExpenseDTO> CreateExpenseAsync(CreateExpenseDTO dto)
        {
            var result = _createDtoValidator.Validate(dto);

            if (!result.IsValid) throw new ValidationException(result.Errors);

            var existCategory = await categoryService.ValidateCategoryByIdAsync(dto.CategoryId);
            var existPaymentMethod = await paymentMethodService.ValidatePaymentMethodByIdAsync(dto.PaymentMethodId);

            var expense = _mapper.Map<Expense>(dto);

            await _repo.AddAsync(expense);
            await _repo.SaveChangesAsync();

            return _mapper.Map<ExpenseDTO>(expense);
        }

        public async Task<IEnumerable<ExpenseDTO>> GetAllExpensesAsync()
        {
            var expenses = await _repo.GetAllAsync();

            if (!expenses.Any()) throw new NotFoundException("Actualmente no existen gastos.");

            return _mapper.Map<IEnumerable<ExpenseDTO>>(expenses);
        }

        public async Task<ExpenseDTO> GetExpenseById(int id)
        {
            var expense = await ValidateExpenseByIdAsync(id);
            return _mapper.Map<ExpenseDTO>(expense);
        }

        public async Task UpdateExpenseAsync(int id, UpdateExpenseDTO dto)
        {
            var result = _updateDtoValidator.Validate(dto);
            if (!result.IsValid) throw new ValidationException(result.Errors);

            var expense = await ValidateExpenseByIdAsync(id);
            var existCategory = await categoryService.ValidateCategoryByIdAsync(dto.CategoryId);
            var existPaymentMethod = await paymentMethodService.ValidatePaymentMethodByIdAsync(dto.PaymentMethodId);

            _mapper.Map(dto, expense);
            _repo.Update(expense);
            await _repo.SaveChangesAsync();
        }

        public async Task DeleteExpenseAsync(int id)
        {
            var expense = await ValidateExpenseByIdAsync(id);
            _repo.Delete(expense);
            await _repo.SaveChangesAsync();
        }

        public async Task<List<ExpenseDTO>> FilterExpensesAsync(FilterExpenseDTO dto)
        {
            var expenses = _repo.GetQueryable();

            if (!string.IsNullOrEmpty(dto.Description))
                expenses = expenses.Where(e => e.Description.Contains(dto.Description));


            if (dto.CategoryId is not null)
                expenses = expenses.Where(e => e.CategoryId.Equals(dto.CategoryId));


            if (dto.PaymentMethodId is not null)
                expenses = expenses.Where(e => e.PaymentMethodId.Equals(dto.PaymentMethodId));


            if (dto.FromTheDate is not null)
                expenses = expenses.Where(e => e.Date >= dto.FromTheDate);


            if (dto.ToTheDate is not null)
            {
                expenses = expenses.Where(e => e.Date <= dto.ToTheDate);
            }

            return _mapper.Map<List<ExpenseDTO>>(expenses.ToList());
        }

        private async Task<Expense> ValidateExpenseByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id)
                ?? throw new NotFoundException($"El gasto con id {id} no existe");
        }
    }
}
