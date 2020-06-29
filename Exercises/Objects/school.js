// Create a school object. The school object uses the student object from the
// previous exercise. It has methods that use and update information about the
// student. Be sure to check out the previous exercise for the other arguments
// that might be needed by the school object. Implement the following methods
// for the school object:

// addStudent: Adds a student by creating a new student and adding the student to
// a collection of students. The method adds a constraint that the year can only
// be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns
// a student object if year is valid otherwise it logs "Invalid Year".
// enrollStudent: Enrolls a student in a course.
// addGrade: Adds the grade of a student for a course.
// getReportCard: Logs the grades of a student for all courses. If the course has
// no grade, it uses "In progress" as the grade.
// courseReport: Logs the grades of all students for a given course name. Only
// student with grades are part of the course report.
// To test your code, use the three student objects listed below. Using the three
// student objects, produces the following values from the getReportCard and
// courseReport methods respectively.

function createStudent(name, year) {
  return (() => {
    let courses = [];
    return {
      name,
      year,
      info() {
        console.log(`${name} is a ${year} student`);
      },
      addCourse(course) {
        courses.push(course);
      },
      listCourses() {
        console.log(courses);
      },
      getCourses() {
        return courses;
      },
      addNote(courseNum, note) {
        let course = this.findCourseByCode(courseNum);
        course.note ? course.note.push(note) : course.note = [note];
      },
      updateNote(courseNum, note) {
        let course = this.findCourseByCode(courseNum);
        course.note = [note];
      },
      viewNotes() {
        courses.forEach(course => {
          if (course.hasOwnProperty('note')) {
            console.log(`${course.name}: ${course.note.join(';')}`);
          }
        });
      },
      findCourseByCode(num) {
        for (var i = 0; i < courses.length; i++) {
          if (courses[i].code === num) { return courses[i] }
        }
      },
      findCourseByName(name) {
        for (var i = 0; i < courses.length; i++) {
          if (courses[i].name === name) { return courses[i] }
        }
      }
    };
  })()
}

let school = (() => {
  const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
  let students = [];
  let classes = {};
  return {
    addStudent(name, year) {
      if (VALID_YEARS.includes(year)) {
        return createStudent(name, year);
      } else {
        console.log('Invalid Year');
      }
    },
    enrollStudent(student, course) {
      student.addCourse(course);
      classes[course.name] ? classes[course.name].push(student) : classes[course.name] = [student];
    },
    addGrade(student, code, grade) {
      student.findCourseByCode(code).grade = grade;
    },
    getReportCard(student) {
      student.getCourses().forEach(course => {
        console.log(`${course.name}: ${course.grade || 'In progress'}`);
      });
    },
    courseReport(courseName) {
      console.log(`=${courseName}=`);
      let roster = classes[courseName];
      roster.forEach(student => {
        let course = student.findCourseByName(courseName);
        if (course.grade) {
          console.log(`${student.name}: ${course.grade}`);
        }
      })
    },
  };
})()

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, { name: 'Math', code: 101, });
school.enrollStudent(foo, { name: 'Advanced Math', code: 102, });
school.enrollStudent(foo, { name: 'Physics', code: 202, })
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, { name: 'Math', code: 101, });
school.addGrade(bar, 101, 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, { name: 'Math', code: 101, });
school.enrollStudent(qux, { name: 'Advanced Math', code: 102, });
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);

school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined
