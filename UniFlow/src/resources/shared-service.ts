import { singleton } from 'aurelia';

// interfaces for clarity
export interface Course {
  id: string;
  name: string;
  description: string;
}

export interface Exam {
  subject: string;
  date: string;
}

export interface Grade {
  student: string;
  course: string;
  grade: string;
}

@singleton()
export class SharedService {
  private role: string = 'unknown';
  private username: string = '';

  // State
  private courses: Course[] = [
    { id: '1', name: 'Computer Science 101', description: 'Introduction to Computer Science.' },
    { id: '2', name: 'Mathematics 101', description: 'Introduction to Algebra.' },
    { id: '3', name: 'Computer Architecture', description: 'Learn about CPU design and memory hierarchy.' },
  ];

  private exams: Exam[] = [];
  private grades: Grade[] = [];
  private enrollments: { student: string; courses: string[] }[] = [];

  // User methods
  public setUser(username: string, role: string): void {
    this.username = username;
    this.role = role;
  }

  public getUser(): { username: string; role: string } {
    return { username: this.username, role: this.role };
  }

  public getRole(): string {
    return this.role;
  }

  // Course methods
  public getCourses(): Course[] {
    return this.courses;
  }

  public addCourse(course: Course): void {
    this.courses.push(course);
  }

  // Exam methods
  public addExam(exam: Exam): void {
    this.exams.push(exam);
  }

  public getExams(): Exam[] {
    return this.exams;
  }

  public getExamsByCourses(courses: string[]): Exam[] {
    return this.exams.filter(exam => courses.includes(exam.subject));
  }

  // Grade methods
  public addGrade(grade: Grade): void {
    this.grades.push(grade);
  }

  public getGrades(): Grade[] {
    return this.grades;
  }

  public getGradesByStudent(student: string): Grade[] {
    return this.grades.filter(grade => grade.student === student);
  }

  // Enrollment methods
  public enrollStudent(student: string, courseId: string): void {
    let enrollment = this.enrollments.find(e => e.student === student);
    if (!enrollment) {
      enrollment = { student, courses: [] };
      this.enrollments.push(enrollment);
    }
    if (!enrollment.courses.includes(courseId)) {
      enrollment.courses.push(courseId);
    }
  }

  public getEnrolledCourses(student: string): string[] {
    const enrollment = this.enrollments.find(e => e.student === student);
    return enrollment ? enrollment.courses : [];
  }
}
