// Create an object factory for a student object.
// The student object should have the following methods
// and it should produce the expected results demonstrated in the sample code:


function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} student`);
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);
    },
    
    listCourses() {
      console.log(this.courses);
    },

    addNote(courseCode, note) {
      let course = this.courses.find(course => {
        return course.code === courseCode
      });

      let name = course.name;

      if (course.note) course.note += `; ${name}: ${note}`;
      
      else course.note = `${name}: ${note}`;
    },

    viewNotes() {
      this.courses.forEach(course => console.log(course.note));
    },

    updateNote(courseCode, note) {
      let course = this.courses.find(course => {
        return course.code === courseCode
      });

      let name = course.name;

      if (course.note) course.note = `${name}: ${note}`;

      else this.addNote(courseCode, note);
    }

  }
}


let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"

// input: courseCode, note
// output: `${courses[code]}: ${note}`

// Will need to find course with corresponding code
// can use find method

// this.courses.find(course => course.code === courseCode)