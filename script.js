/* ==========================================
        COLLEGE MANAGEMENT SYSTEM
========================================== */


/* ==========================================
        DATA
========================================== */

let students =
    JSON.parse(localStorage.getItem("students")) || [

        {
            id: "ST001",
            name: "Rahul Kumar",
            email: "rahul@gmail.com",
            phone: "9876543210",
            course: "CSE",
            year: "2nd Year",
            attendance: 92,
            totalFees: 50000,
            paidFees: 50000
        },

        {
            id: "ST002",
            name: "Aman Verma",
            email: "aman@gmail.com",
            phone: "9876543211",
            course: "AIML",
            year: "3rd Year",
            attendance: 86,
            totalFees: 50000,
            paidFees: 35000
        },

        {
            id: "ST003",
            name: "Priya Singh",
            email: "priya@gmail.com",
            phone: "9876543212",
            course: "ECE",
            year: "1st Year",
            attendance: 72,
            totalFees: 50000,
            paidFees: 50000
        }

    ];


let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [

        {
            id: "T001",
            name: "Dr. Rajesh Sharma",
            department: "Computer Science",
            email: "rajesh@college.com",
            phone: "9876500001"
        },

        {
            id: "T002",
            name: "Dr. Neha Singh",
            department: "AIML",
            email: "neha@college.com",
            phone: "9876500002"
        }

    ];


let courses =
    JSON.parse(localStorage.getItem("courses")) || [

        {
            code: "CS101",
            name: "Computer Science",
            department: "CSE",
            duration: "4 Years",
            students: 150
        },

        {
            code: "AI101",
            name: "Artificial Intelligence",
            department: "AIML",
            duration: "4 Years",
            students: 100
        },

        {
            code: "EC101",
            name: "Electronics Engineering",
            department: "ECE",
            duration: "4 Years",
            students: 120
        }

    ];


let notices =
    JSON.parse(localStorage.getItem("notices")) || [

        {
            id: 1,
            title: "Semester Examination",
            description:
                "End semester examination will start from 15 September 2026."
        },

        {
            id: 2,
            title: "Scholarship Form",
            description:
                "Students can submit scholarship forms before the last date."
        },

        {
            id: 3,
            title: "College Event",
            description:
                "Annual cultural event registration is now open."
        }

    ];


/* ==========================================
        SAVE DATA
========================================== */

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "teachers",
        JSON.stringify(teachers)
    );

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

    localStorage.setItem(
        "notices",
        JSON.stringify(notices)
    );
}


/* ==========================================
        LOGIN
========================================== */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const error =
            document.getElementById("loginError");


        if (
            username === "admin" &&
            password === "1234"
        ) {

            document.getElementById(
                "loginPage"
            ).style.display = "none";


            document.getElementById(
                "mainApp"
            ).style.display = "block";


            updateDashboard();

        } else {

            error.innerText =
                "Invalid username or password!";

        }

    }
);


/* ==========================================
        LOGOUT
========================================== */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            document.getElementById(
                "mainApp"
            ).style.display = "none";


            document.getElementById(
                "loginPage"
            ).style.display = "flex";


            document.getElementById(
                "username"
            ).value = "";


            document.getElementById(
                "password"
            ).value = "";

        }
    );


/* ==========================================
        PAGE NAVIGATION
========================================== */

const menuLinks =
    document.querySelectorAll(".menu a");


menuLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                menuLinks.forEach(
                    item =>
                        item.classList.remove("active")
                );


                link.classList.add("active");


                const pageName =
                    link.dataset.page;


                document
                    .querySelectorAll(".page")
                    .forEach(
                        page =>
                            page.classList.remove("active")
                    );


                document
                    .getElementById(pageName)
                    .classList.add("active");


                const titles = {

                    dashboard: "Dashboard",

                    students: "Student Management",

                    teachers: "Teacher Management",

                    courses: "Course Management",

                    attendance:
                        "Attendance Management",

                    fees: "Fees Management",

                    notices: "Notice Board"

                };


                document.getElementById(
                    "pageTitle"
                ).innerText = titles[pageName];


                if (pageName === "students")
                    renderStudents();

                if (pageName === "teachers")
                    renderTeachers();

                if (pageName === "courses")
                    renderCourses();

                if (pageName === "attendance")
                    renderAttendance();

                if (pageName === "fees")
                    renderFees();

                if (pageName === "notices")
                    renderNotices();

            }
        );

    }
);


/* ==========================================
        DASHBOARD
========================================== */

function updateDashboard() {

    document.getElementById(
        "totalStudents"
    ).innerText = students.length;


    document.getElementById(
        "totalTeachers"
    ).innerText = teachers.length;


    document.getElementById(
        "totalCourses"
    ).innerText = courses.length;


    const fees =
        students.reduce(
            (total, student) =>
                total + student.paidFees,
            0
        );


    document.getElementById(
        "totalFees"
    ).innerText =
        "₹" + fees.toLocaleString();


    renderRecentStudents();

    renderAttendance();

}


/* ==========================================
        RECENT STUDENTS
========================================== */

function renderRecentStudents() {

    const table =
        document.getElementById(
            "recentStudents"
        );


    table.innerHTML = "";


    students.slice(-5).forEach(
        function(student) {

            table.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.course}</td>

                    <td>
                        <span class="status status-active">
                            Active
                        </span>
                    </td>

                </tr>

            `;

        }
    );
}


/* ==========================================
        STUDENTS
========================================== */

function renderStudents() {

    const table =
        document.getElementById(
            "studentTable"
        );


    table.innerHTML = "";


    students.forEach(
        function(student) {

            table.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.phone}</td>

                    <td>${student.course}</td>

                    <td>${student.year}</td>

                    <td>

                        <button
                            class="action-btn edit-btn"
                            onclick="editStudent('${student.id}')"
                        >
                            Edit
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteStudent('${student.id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );
}


/* ==========================================
        SEARCH
========================================== */

document
    .getElementById("studentSearch")
    .addEventListener(
        "input",
        function() {

            const search =
                this.value.toLowerCase();


            const rows =
                document
                    .getElementById("studentTable")
                    .querySelectorAll("tr");


            rows.forEach(
                function(row) {

                    const text =
                        row.innerText.toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ""
                            : "none";

                }
            );

        }
    );


/* ==========================================
        ADD STUDENT MODAL
========================================== */

document
    .getElementById("addStudentBtn")
    .addEventListener(
        "click",
        function() {

            document.getElementById(
                "studentModalTitle"
            ).innerText = "Add Student";


            document.getElementById(
                "studentEditId"
            ).value = "";


            document.getElementById(
                "studentForm"
            ).reset();


            openModal("studentModal");

        }
    );


/* ==========================================
        SAVE STUDENT
========================================== */

document
    .getElementById("studentForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const editId =
                document.getElementById(
                    "studentEditId"
                ).value;


            const studentData = {

                name:
                    document.getElementById(
                        "studentName"
                    ).value,

                email:
                    document.getElementById(
                        "studentEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "studentPhone"
                    ).value,

                course:
                    document.getElementById(
                        "studentCourse"
                    ).value,

                year:
                    document.getElementById(
                        "studentYear"
                    ).value

            };


            if (editId) {

                const student =
                    students.find(
                        s => s.id === editId
                    );


                student.name =
                    studentData.name;

                student.email =
                    studentData.email;

                student.phone =
                    studentData.phone;

                student.course =
                    studentData.course;

                student.year =
                    studentData.year;

            } else {

                students.push({

                    id:
                        "ST" +
                        String(Date.now())
                            .slice(-5),

                    ...studentData,

                    attendance: 80,

                    totalFees: 50000,

                    paidFees: 0

                });

            }


            saveData();

            closeModal("studentModal");

            renderStudents();

            updateDashboard();

        }
    );


/* ==========================================
        EDIT STUDENT
========================================== */

function editStudent(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) return;


    document.getElementById(
        "studentModalTitle"
    ).innerText = "Edit Student";


    document.getElementById(
        "studentEditId"
    ).value = student.id;


    document.getElementById(
        "studentName"
    ).value = student.name;


    document.getElementById(
        "studentEmail"
    ).value = student.email;


    document.getElementById(
        "studentPhone"
    ).value = student.phone;


    document.getElementById(
        "studentCourse"
    ).value = student.course;


    document.getElementById(
        "studentYear"
    ).value = student.year;


    openModal("studentModal");
}


/* ==========================================
        DELETE STUDENT
========================================== */

function deleteStudent(id) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        students =
            students.filter(
                student =>
                    student.id !== id
            );


        saveData();

        renderStudents();

        updateDashboard();

    }
}


/* ==========================================
        TEACHERS
========================================== */

function renderTeachers() {

    const table =
        document.getElementById(
            "teacherTable"
        );


    table.innerHTML = "";


    teachers.forEach(
        function(teacher) {

            table.innerHTML += `

                <tr>

                    <td>${teacher.id}</td>

                    <td>${teacher.name}</td>

                    <td>${teacher.department}</td>

                    <td>${teacher.email}</td>

                    <td>${teacher.phone}</td>

                    <td>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteTeacher('${teacher.id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );
}


/* ==========================================
        ADD TEACHER
========================================== */

document
    .getElementById("addTeacherBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("teacherForm")
                .reset();

            openModal("teacherModal");

        }
    );


document
    .getElementById("teacherForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            teachers.push({

                id:
                    "T" +
                    String(Date.now())
                        .slice(-5),

                name:
                    document.getElementById(
                        "teacherName"
                    ).value,

                department:
                    document.getElementById(
                        "teacherDepartment"
                    ).value,

                email:
                    document.getElementById(
                        "teacherEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "teacherPhone"
                    ).value

            });


            saveData();

            closeModal("teacherModal");

            renderTeachers();

            updateDashboard();

        }
    );


function deleteTeacher(id) {

    if (confirm("Delete this teacher?")) {

        teachers =
            teachers.filter(
                teacher =>
                    teacher.id !== id
            );


        saveData();

        renderTeachers();

        updateDashboard();

    }
}


/* ==========================================
        COURSES
========================================== */

function renderCourses() {

    const table =
        document.getElementById(
            "courseTable"
        );


    table.innerHTML = "";


    courses.forEach(
        function(course) {

            table.innerHTML += `

                <tr>

                    <td>${course.code}</td>

                    <td>${course.name}</td>

                    <td>${course.department}</td>

                    <td>${course.duration}</td>

                    <td>${course.students}</td>

                    <td>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteCourse('${course.code}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );
}


/* ==========================================
        ADD COURSE
========================================== */

document
    .getElementById("addCourseBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("courseForm")
                .reset();

            openModal("courseModal");

        }
    );


document
    .getElementById("courseForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            courses.push({

                code:
                    document.getElementById(
                        "courseCode"
                    ).value,

                name:
                    document.getElementById(
                        "courseName"
                    ).value,

                department:
                    document.getElementById(
                        "courseDepartment"
                    ).value,

                duration:
                    document.getElementById(
                        "courseDuration"
                    ).value,

                students: 0

            });


            saveData();

            closeModal("courseModal");

            renderCourses();

            updateDashboard();

        }
    );


function deleteCourse(code) {

    if (confirm("Delete this course?")) {

        courses =
            courses.filter(
                course =>
                    course.code !== code
            );


        saveData();

        renderCourses();

        updateDashboard();

    }
}


/* ==========================================
        ATTENDANCE
========================================== */

function renderAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    table.innerHTML = "";


    let good = 0;

    let low = 0;


    students.forEach(
        function(student) {

            if (student.attendance >= 75) {
                good++;
            } else {
                low++;
            }


            const status =
                student.attendance >= 75
                    ? "Good"
                    : "Low";


            const statusClass =
                student.attendance >= 75
                    ? "status-active"
                    : "status-pending";


            table.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.course}</td>

                    <td>${student.attendance}%</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${status}
                        </span>
                    </td>

                </tr>

            `;

        }
    );


    document.getElementById(
        "presentCount"
    ).innerText = good;


    document.getElementById(
        "lowAttendance"
    ).innerText = low;

}


/* ==========================================
        FEES
========================================== */

function renderFees() {

    const table =
        document.getElementById(
            "feeTable"
        );


    table.innerHTML = "";


    students.forEach(
        function(student) {

            const due =
                student.totalFees -
                student.paidFees;


            const status =
                due === 0
                    ? "Paid"
                    : "Pending";


            const statusClass =
                due === 0
                    ? "status-paid"
                    : "status-pending";


            table.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>
                        ₹${student.totalFees.toLocaleString()}
                    </td>

                    <td>
                        ₹${student.paidFees.toLocaleString()}
                    </td>

                    <td>
                        ₹${due.toLocaleString()}
                    </td>

                    <td>

                        <span class="status ${statusClass}">
                            ${status}
                        </span>

                    </td>

                </tr>

            `;

        }
    );
}


/* ==========================================
        NOTICES
========================================== */

function renderNotices() {

    const grid =
        document.getElementById(
            "noticeGrid"
        );


    grid.innerHTML = "";


    notices.forEach(
        function(notice) {

            grid.innerHTML += `

                <div class="notice">

                    <h3>
                        📢 ${notice.title}
                    </h3>

                    <p>
                        ${notice.description}
                    </p>

                    <small>
                        College Notice
                    </small>

                    <br>

                    <button
                        class="notice-delete"
                        onclick="deleteNotice(${notice.id})"
                    >
                        Delete
                    </button>

                </div>

            `;

        }
    );
}


/* ==========================================
        ADD NOTICE
========================================== */

document
    .getElementById("addNoticeBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("noticeForm")
                .reset();

            openModal("noticeModal");

        }
    );


document
    .getElementById("noticeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            notices.push({

                id: Date.now(),

                title:
                    document.getElementById(
                        "noticeTitle"
                    ).value,

                description:
                    document.getElementById(
                        "noticeDescription"
                    ).value

            });


            saveData();

            closeModal("noticeModal");

            renderNotices();

        }
    );


function deleteNotice(id) {

    if (confirm("Delete this notice?")) {

        notices =
            notices.filter(
                notice =>
                    notice.id !== id
            );


        saveData();

        renderNotices();

    }
}


/* ==========================================
        MODAL
========================================== */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


/* CLOSE BUTTONS */

document
    .querySelectorAll(".close")
    .forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        }
    );


/* CLOSE MODAL WHEN CLICK OUTSIDE */

document
    .querySelectorAll(".modal")
    .forEach(
        function(modal) {

            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );


/* ==========================================
        INITIAL DATA
========================================== */

saveData();

renderStudents();

renderTeachers();

renderCourses();

renderNotices();

updateDashboard();