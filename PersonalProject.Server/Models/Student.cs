using System;
using System.Collections.Generic;

namespace PersonalProject.Server.Models;

public partial class Student
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Roll { get; set; }

    public int? Class { get; set; }

    public string? Gender { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
}
