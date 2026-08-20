using AutoMapper;
using FluentValidation;
using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Exceptions;
using Menudo.Domain.Interfaces;

namespace Menudo.Application.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly IPaymentMethodRepository _repo;
        private readonly IValidator<CreatePaymentMethodDTO> _createDtoValidator;
        private readonly IValidator<UpdatePaymentMethodDTO> _updateDtoValidator;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public PaymentMethodService(IPaymentMethodRepository repo, IValidator<CreatePaymentMethodDTO> createDtoValidator, 
            IValidator<UpdatePaymentMethodDTO> updateDtoValidator, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repo = repo;
            _createDtoValidator = createDtoValidator;
            _updateDtoValidator = updateDtoValidator;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<PaymentMethodDTO> CreatePaymentMethodAsync(CreatePaymentMethodDTO dto)
        {
            var result = _createDtoValidator.Validate(dto);

            if (!result.IsValid) throw new ValidationException(result.Errors);

            var normalizedInput = dto.Name.Trim().ToLower();

            var existingMethod = _repo.GetQueryable()
                                    .FirstOrDefault(c => c.Name.Trim().ToLower() == normalizedInput);

            if (existingMethod != null)
            {
                throw new BadRequestException($"La categoría '{dto.Name}' ya existe o es muy similar a otra registrada.");
            }

            var userId = _currentUserService.UserId!.Value;
            var paymentMethod = _mapper.Map<PaymentMethod>(dto);
            paymentMethod.UserId = userId;

            await _repo.AddAsync(paymentMethod);
            await _repo.SaveChangesAsync();

            return _mapper.Map<PaymentMethodDTO>(paymentMethod);
        }

        public async Task<IEnumerable<PaymentMethodDTO>> GetAllPaymentMethodsAsync()
        {
            var userId = _currentUserService.UserId;
            var paymentMethods = await _repo.GetAllAsync(userId!.Value);

            if (paymentMethods is null) throw new NotFoundException("Actualmente no existen metodos de pago.");

            return _mapper.Map<IEnumerable<PaymentMethodDTO>>(paymentMethods);
        }

        public async Task<PaymentMethodDTO> GetPaymentMethodById(int id)
        {
            var paymentMethod = await ValidatePaymentMethodByIdAsync(id);
            return _mapper.Map<PaymentMethodDTO>(paymentMethod);
        }

        public async Task UpdatePaymentMethodAsync(int id, UpdatePaymentMethodDTO dto)
        {
            var result = _updateDtoValidator.Validate(dto);
            if (!result.IsValid) throw new ValidationException(result.Errors);
            
            var paymentMethod = await ValidatePaymentMethodByIdAsync(id);

            _mapper.Map(dto, paymentMethod);
            _repo.Update(paymentMethod);
            await _repo.SaveChangesAsync();
        }

        public async Task DeletePaymentMethodAsync(int id)
        {
            var paymentMethod = await ValidatePaymentMethodByIdAsync(id);
            _repo.Delete(paymentMethod);
            await _repo.SaveChangesAsync();
        }

        public async Task<PaymentMethod> ValidatePaymentMethodByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id)
                ?? throw new NotFoundException($"El metodo de pago con id {id} no existe");
        }
    }
}
