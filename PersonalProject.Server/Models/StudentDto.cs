using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalProject.Server.Models
{
    public class StudentDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; } 
        public int? Roll { get; set; } 
        public int? Class { get; set; } 
        public string? Gender { get; set; } 
    }
}
