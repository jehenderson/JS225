// Create an object factory for a student object. The student object should
// have the following methods and it should produce the expected results
// demonstrated in the sample code:

// info: Logs the name and year of the student.
// addCourse: Enrolls student in a course. A course is an object literal that
// has properties for its name and code.
// listCourses: Returns a list of the courses student has enrolled in.
// addNote: Adds a note property to a course. Takes a code and a note
// as an argument. If a note already exists, the note is appended to the
// existing one.
// updateNote: Updates a note for a course. Updating a note replaces the
// existing note with the new note.
// viewNotes: Logs the notes for all the courses. Courses without notes are
// not displayed.
function createStudent(name, year) {
  return (() => {
    let courses = [];
    return {
      info() {
        console.log(`${name} is a ${year} student`);
      },
      addCourse(course) {
        courses.push(course);
      },
      listCourses() {
        console.log(courses);
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
    };
  })()
}

foo = createStudent('Foo', '1st');
foo.info();
// = Foo is a 1st year student
foo.listCourses();
// = [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// = [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// = Math: Fun Course; Remember to study for algebra
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// = Math: Fun Course; Remember to study for algebra
// = Advanced Math: Difficult Subject
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// = Math: Fun Course
// = Advance Math: Difficult Subject
