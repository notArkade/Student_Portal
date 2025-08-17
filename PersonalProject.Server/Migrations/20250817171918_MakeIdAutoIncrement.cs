using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class MakeIdAutoIncrement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    NAME = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    ROLL = table.Column<int>(type: "int", nullable: true),
                    CLASS = table.Column<int>(type: "int", nullable: true),
                    GENDER = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Student__3214EC27AC720782", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Attendance",
                columns: table => new
                {
                    AttendanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentID = table.Column<int>(type: "int", nullable: true),
                    AttendanceDate = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Attendan__8B69263C9E0561FC", x => x.AttendanceID);
                    table.ForeignKey(
                        name: "FK__Attendanc__Stude__4CA06362",
                        column: x => x.StudentID,
                        principalTable: "Student",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attendance_StudentID",
                table: "Attendance",
                column: "StudentID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendance");

            migrationBuilder.DropTable(
                name: "Student");
        }
    }
}
