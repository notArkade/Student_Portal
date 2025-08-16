using System;
using System.Collections.Generic;

namespace PersonalProject.Server.Models;

public partial class Attendance
{
    public int AttendanceId { get; set; }

    public int? StudentId { get; set; }

    public DateOnly? AttendanceDate { get; set; }

    public virtual Student? Student { get; set; }
}
