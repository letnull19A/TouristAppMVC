using System.ComponentModel.DataAnnotations;

namespace TouristCompany.Models.DTOs;

public sealed class RegistrationDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    public string LastName { get; set; } = string.Empty;
    
    public string? Patronymic { get; set; } = string.Empty;
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
    
    [Required]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Required]
    public string Login { get; set; } = string.Empty;
}