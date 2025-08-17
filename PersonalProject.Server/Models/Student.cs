using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalProject.Server.Models;

public partial class Student
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Roll { get; set; }

    public int? Class { get; set; }

    public string? Gender { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
}
