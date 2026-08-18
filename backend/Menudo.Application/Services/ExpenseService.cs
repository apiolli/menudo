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
        private readonly ICurrentUserService currentUserService;
        private readonly ICategoryService categoryService;
        private readonly IPaymentMethodService paymentMethodService;
        private readonly IMapper _mapper;
        public ExpenseService(IExpenseRepository repo, IValidator<CreateExpenseDTO> createDtoValidator, 
            IValidator<UpdateExpenseDTO> updateDtoValidator, ICurrentUserService currentUserService, 
            ICategoryService categoryService, IPaymentMethodService paymentMethodService, IMapper mapper)
        {
            _repo = repo;
            _createDtoValidator = createDtoValidator;
            _updateDtoValidator = updateDtoValidator;
            this.currentUserService = currentUserService;
            this.categoryService = categoryService;
            this.paymentMethodService = paymentMethodService;
            _mapper = mapper;
        }

        public async Task<ExpenseDTO> CreateExpenseAsync(CreateExpenseDTO dto)
        {
            var result = _createDtoValidator.Validate(dto);

            if (!result.IsValid) throw new ValidationException(result.Errors);

            var userId = currentUserService.UserId;

            var existCategory = await categoryService.ValidateCategoryByIdAsync(dto.CategoryId);
            var existPaymentMethod = await paymentMethodService.ValidatePaymentMethodByIdAsync(dto.PaymentMethodId);

            var expense = _mapper.Map<Expense>(dto);
            expense.UserId = userId!.Value;

            await _repo.AddAsync(expense);
            await _repo.SaveChangesAsync();

            return _mapper.Map<ExpenseDTO>(expense);
        }

        public async Task<IEnumerable<ExpenseDTO>> GetAllExpensesAsync()
        {
            var userId = currentUserService.UserId;
            var expenses = await _repo.GetAllAsync(userId!.Value);

            if (expenses is null) throw new NotFoundException("Actualmente no existen gastos.");

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

        public async Task<PaginationExpenseDTO> FilterExpensesAsync(FilterExpenseDTO dto)
        {
            var userId = currentUserService.UserId;
            var query = _repo.GetQueryable();
            var expenses = query.Where(x => x.UserId == userId);

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

            var totalItems = expenses.Count();

            int pageNumber = dto.PageNumber > 0 ? dto.PageNumber : 1;
            int pageSize = dto.PageSize > 0 ? dto.PageSize : 8;

            var items = expenses
                .OrderByDescending(e => e.Date) 
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();

            var itemsDto = _mapper.Map<List<ExpenseDTO>>(items);
            int totalPages = pageSize > 0 ? (int)Math.Ceiling(totalItems / (double)dto.PageSize) : 0;

            return new PaginationExpenseDTO
                {
                    Items = itemsDto,
                    TotalItems = totalItems,
                    PageNumber = dto.PageNumber,
                    PageSize = dto.PageSize,
                    TotalPages = totalPages
                };
        }

        private async Task<Expense> ValidateExpenseByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id)
                ?? throw new NotFoundException($"El gasto con id {id} no existe");
        }
    }
}
