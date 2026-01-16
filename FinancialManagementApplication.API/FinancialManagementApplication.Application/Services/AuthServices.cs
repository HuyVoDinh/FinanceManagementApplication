using FinanceManagementApplication.Application.Interface.Repositories;
using FinanceManagementApplication.Domain.Entities;
using FinancialManagementApplication.Application.DTOs.Auth;
using FinancialManagementApplication.Application.Interface.Securitiy;
using System;
using System.Collections.Generic;
using System.Text;
using BCrypt.Net;

namespace FinancialManagementApplication.Application.Services
{
    public class AuthService
    {
        private readonly IAccountRepository _repo;
        private readonly IJwtTokenGenerator _jwt;

        public AuthService(IAccountRepository repo, IJwtTokenGenerator jwt)
        {
            _repo = repo;
            _jwt = jwt;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            var existing = await _repo.GetByEmailAsync(request.Email);
            if (existing != null)
                throw new Exception("Email already exists");

            var account = new Account
            {
                AccountID = Guid.NewGuid(),
                email = request.Email,
                passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            await _repo.AddAsync(account);

            return new AuthResponse
            {
                Token = _jwt.Generate(account)
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var account = await _repo.GetByEmailAsync(request.Email)
                ?? throw new Exception("Invalid credentials");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, account.passwordHash))
                throw new Exception("Invalid credentials");

            return new AuthResponse
            {
                Token = _jwt.Generate(account)
            };
        }
    }
}
