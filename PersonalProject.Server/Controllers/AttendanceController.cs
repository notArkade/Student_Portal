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
            var checkStudentAttendance = Context.Attendances.Where(r => r.AttendanceDate == attendanceDto.AttendanceDate && r.StudentId == attendanceDto.StudentId).Any();
            
            if(checkStudentAttendance)
            {
                return Ok(new
                {
                    message = "Attendance already done."
                });
            } else
            {
                

            Context.Attendances.Add(new Attendance()
            {
                StudentId = attendanceDto.StudentId,
                AttendanceDate = attendanceDto.AttendanceDate,
            });

            await Context.SaveChangesAsync();
            return Ok(new
            {
                message = "Attendance saved successfully."
            });
            }
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
            var Attendance = Context.Attendances.FirstOrDefault(r => r.StudentId == studentId && r.AttendanceDate == attendanceDto.AttendanceDate);

            if(Attendance != null)
            {
                Attendance.StudentId = attendanceDto.StudentId ?? Attendance.StudentId;
                Attendance.AttendanceDate = attendanceDto.AttendanceDate ?? Attendance.AttendanceDate;

                Context.SaveChanges();
            } else
            {
                return NotFound(new
                {
                    message = "Attendance record not found"
                });
            }

            return Ok(new
            {
                message = "Attendance succesfully updated"
            });
        }
    }
}
