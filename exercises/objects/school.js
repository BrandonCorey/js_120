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
      return this.courses;
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

let school = {
  students: [],

  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
    
      let student = createStudent(name, year);
      this.students.push(student);
    
      return student;

    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode})
  },

  addGrade(student, courseName, grade) {
    let course = student.listCourses().find(course => {
      return course.name === courseName;
    });

    if (course) course.grade = grade;

  },

  getReportCard(student) {
    student.listCourses().forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport(courseName) {
    const getCourse = (student, courseName) => {
      return student.listCourses().find(course => {
        return course.name === courseName;
      })
    }

    const getAverage = grades => {
      return grades.reduce((sum, current) => {
        return sum + current
      }, 0) / grades.length;
    }

    let enrolled = this.students.filter(student => {
      let course = getCourse(student, courseName);
      return course && course.grade;
    });


    if (enrolled.length > 0) {
      let grades = [];

      console.log(`=${courseName}=`)
      enrolled.forEach(student => {
        
        let course = getCourse(student, courseName);
        console.log(`${student.name}: ${course.grade}`);
        grades.push(course.grade);

      });

      console.log(`Course Average: ${getAverage(grades)}`);
    }
  },
};

let bob = school.addStudent('bob', '1st');
let andy = school.addStudent('andy', '2nd');


school.enrollStudent(bob, 'Math', 101);
school.addGrade(bob, "Math", 95);
school.getReportCard(bob);

school.enrollStudent(andy, 'Math', 101);
school.addGrade(andy, 'Math', 74);
school.getReportCard(andy);
school.courseReport('Math');

