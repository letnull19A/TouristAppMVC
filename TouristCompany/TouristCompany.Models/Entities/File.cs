using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("files")]
public class File
{
    [Key]
    [Column("id")]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Column("file_name")]
    [Required]
    public string FileName { get; set; } = string.Empty;
}