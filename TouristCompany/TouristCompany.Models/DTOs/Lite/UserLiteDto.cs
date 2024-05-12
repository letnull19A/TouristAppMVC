﻿namespace TouristCompany.Models.DTOs.Lite;

public sealed class UserLiteDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public DateOnly BookingDate { get; set; }
}