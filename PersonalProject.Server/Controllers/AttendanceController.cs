using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalProject.Server.Models;

namespace PersonalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        public AttendanceRecordsContext Context { get; set; }

        public AttendanceController()
        {
            Context = new AttendanceRecordsContext();
        }

        [HttpPost]
        public async Task<IActionResult> SaveAttendance(AttendanceDto attendanceDto)
        {
            Context.Attendances.Add(new Attendance()
            {
                //AttendanceId = attendanceDto.AttendanceId,
                StudentId = attendanceDto.StudentId,
                AttendanceDate = attendanceDto.AttendanceDate,
            });

            await Context.SaveChangesAsync();
            return Ok(new
            {
                message = "Attendance saved successfully."
            });
        }

        [HttpGet]
        public IActionResult GetAttendance()
        {
            var AttendanceList = Context.Attendances
                .Include(r => r.Student)
                .Select(r => new AttendanceDto()
            {
                StudentId = r.StudentId,
                StudentName = r.Student != null ? r.Student.Name : null,
                StudentRoll = r.Student !=null ? r.Student.Roll : null,
                AttendanceDate = r.AttendanceDate,
            }).ToList();
            return Ok(AttendanceList);
        }

        [HttpPut]
        public IActionResult UpdateAttendance(int studentId, AttendanceDto attendanceDto)
        {
            
            return Ok(new
            {
                message = "Attendance succesfully updated"
            });
        }
    }
}
