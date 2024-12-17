import { customElement } from '@aurelia/runtime-html';
import template from './exam-manager.html';
import { inject } from 'aurelia';
import { SharedService, Exam, Grade, Course } from '../../resources/shared-service';

@inject(SharedService)
@customElement({
  name: 'exam-manager',
  template
})
export class ExamManager {
  public title: string = 'Exam Manager';
  public role: string = 'undefined';
  public username: string = '';

  public newExam: Exam = { subject: '', date: '' };
  public exams: Exam[] = [];
  public grades: Grade[] = [];

  public studentCourses: string[] = [];
  public filteredExams: Exam[] = [];

  constructor(private sharedService: SharedService) {}

  attached() {
    const user = this.sharedService.getUser();
    this.role = user.role;
    this.username = user.username;

    if (this.role === 'student') {
      this.loadStudentView();
      this.loadStudentExams();

    } else if (this.role === 'teacher') {
      this.loadTeacherView();
      this.exams = this.sharedService.getExams();

    }
  }

  loadStudentView() {
    // Fetch enrolled courses and filter exams
    this.studentCourses = this.sharedService.getEnrolledCourses(this.username);
    this.filteredExams = this.sharedService.getExamsByCourses(this.studentCourses);
  }

  loadTeacherView() {
    // Load all exams for teachers
    this.exams = this.sharedService.getExams();
    this.grades = this.sharedService.getGrades();
  }

  addExam() {
    if (this.newExam.subject && this.newExam.date) {
      this.sharedService.addExam({ ...this.newExam });
      this.newExam = { subject: '', date: '' }; // Reset form
      this.exams = this.sharedService.getExams();
      alert('New exam added successfully!');
    } else {
      alert('Please provide exam subject and date.');
    }
  }

  addGrade(student: string, course: string, grade: string) {
    if (student && course && grade) {
      this.sharedService.addGrade({ student, course, grade });
      this.grades = this.sharedService.getGrades();
      alert('Grade added successfully!');
    } else {
      alert('All fields are required to grade a student.');
    }
  }
  loadStudentExams() {
    // get enrolled course IDs for the student
    const enrolledCourseIds = this.sharedService.getEnrolledCourses(this.username);
  
    // map course IDs to their corresponding Course objects
    const enrolledCourses = enrolledCourseIds
      .map(courseId => this.sharedService.getCourses().find(course => course.id === courseId))
      .filter((course): course is Course => !!course); // Ensure no null/undefined values
  
    // extract course names
    const enrolledCourseNames = enrolledCourses.map(course => course.name);
  
    // filter exams based on the subjects matching the enrolled course names
    this.filteredExams = this.sharedService
      .getExams()
      .filter(exam => enrolledCourseNames.includes(exam.subject));
  }
  
}
