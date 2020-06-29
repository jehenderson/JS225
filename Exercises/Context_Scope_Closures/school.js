// In an earlier exercise, we created a school object. It works, however, it can
// still be improved. The following are improvements for you to implement:

// Make the list students private. Right now, anyone can gain access to it and
// manipulate it.
// Make the constraint for allowed values for years private variable. As a private
// variable it avoids an unnecessary statement in the addStudent method and at the
// same time makes the code more declarative.
// Make the getCourse function accessible in the addGrade method also. As it is,
// only the courseReport method has access.

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
