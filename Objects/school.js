function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    addCourse: function(course) {
      this.courses.push(course);
    },
    listCourses: function() {
      console.log(this.courses);
    },
    findCourse: function(courseNum) {
      for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].code === courseNum) { return this.courses[i] };
      }
      return "Not Found";
    },
    addNote: function(num, note) {
      let course = this.findCourse(num);
      course.notes ? course.notes.push(note) : course.notes = [note];
    },
    updateNote: function(num, note) {
      let course = this.findCourse(num);
      course.notes = [note];
    },
    viewNotes: function() {
      let coursesWithNotes = this.courses.filter(course => course.notes);
      coursesWithNotes.forEach(course => {
        console.log(`${course.name}: ${course.notes.join('; ')}`);
      });
    }
  };
}

function createSchool() {
  const validYears = ['1st', '2nd', '3rd', '4th', '5th'];
  return {
    addStudent: function(name, year) {
      if (validYears.includes(year)) {
        return createStudent(name, year);
      } else {
        console.log('Invalid Year');
      }
    },
    enrollStudent: function(student, course) {
      student.addCourse(course);
    },
    addGrade: function(student, grade) {
      student
    },
    getReportCard: function() {

    },
    courseReport: function() {

    },
  };
}
