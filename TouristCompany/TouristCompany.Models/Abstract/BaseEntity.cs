using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Abstract;

public class BaseEntity
{
    [Key] 
    [Column("id")]
    [Required(ErrorMessage = "id не определён")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(50)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(50000)]
    [Column("description")]
    public string? Description { get; set; } = string.Empty;

    [MaxLength(2000)]
    [Column("image_url")]
    public string ImageUrl { get; set; } = string.Empty;
}