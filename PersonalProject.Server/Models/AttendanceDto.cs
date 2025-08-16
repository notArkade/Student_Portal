namespace PersonalProject.Server.Models
{
    public class AttendanceDto
    {
        //public int AttendanceId { get; set; }

        public int? StudentId { get; set; }

        public string? StudentName { get; set; }

        public int? StudentRoll { get; set; }

        public DateOnly? AttendanceDate { get; set; }

        //public virtual Student? Student { get; set; }
    }
}
