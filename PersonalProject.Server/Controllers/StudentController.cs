using Microsoft.AspNetCore.Mvc;
using PersonalProject.Server.Models;

namespace PersonalProject.Server.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class StudentController : Controller
    {
        public AttendanceRecordsContext Context { get; set; }

        public StudentController()
        {
            Context = new AttendanceRecordsContext();
        }

        [HttpPost]
        public async Task<IActionResult> SaveStudent(StudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Generate next unique ID manually
            int nextId = Context.Students.Any()
                ? Context.Students.Max(s => s.Id) + 1
                : 1;

            Context.Students.Add(new Student()
            {
                Id = nextId,
                Name = studentDto.Name,
                Roll = studentDto.Roll,
                Class = studentDto.Class,
                Gender = studentDto.Gender,
            });

            await Context.SaveChangesAsync();
            return Ok(new
            {
                message = "Successfully saved."
            });
        }

        [HttpGet]
        public IActionResult GetStudent()
        {
            var StudentList = Context.Students.ToList().Select(r => new StudentDto()
            {
                Id = r.Id,
                Name = r.Name,
                Roll = r.Roll,
                Class = r.Class,
                Gender = r.Gender,
            }).ToList();
            return Ok(StudentList);
        }

        [HttpPut]
        public IActionResult UpdateStudent(int id, StudentDto studentDto)
        {
            var Student = Context.Students.Where(r => r.Id == id).FirstOrDefault();

            if (Student != null)
            {
                Student.Name = studentDto.Name;
                Student.Roll = studentDto.Roll;
                Student.Class = studentDto.Class;
                Student.Gender = studentDto.Gender;

                Context.SaveChanges();
            }
            else
            {
                return Ok(new
                {
                    message = "Student not found."
                });
            }
            return Ok(new
            {
                message = "Student successfully updated."
            });
        }

        [HttpDelete]

        public IActionResult DeleteStudetn(int id)
        {
            var Student = Context.Students.Where(r => r.Id == id).FirstOrDefault();

            if (Student != null)
            {
                Context.Remove(Student);
                Context.SaveChanges();
            }
            else
            {
                return Ok(new
                {
                    message = "Student not found."
                });
            }
            return Ok(new
            {
                message = "Successfully deleted student."
            });
        }

    }

}

