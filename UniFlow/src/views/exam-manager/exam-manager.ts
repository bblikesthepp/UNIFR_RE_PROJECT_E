import { customElement } from '@aurelia/runtime-html';
import template from './exam-manager.html';
import { inject } from 'aurelia';
import { SharedService } from '../../resources/shared-service';

@inject(SharedService)
@customElement({
  name: 'exam-manager',
  template
})
export class ExamManager {
  public title: string = 'Exam Manager';
  public role: string = 'undefined';

  public newExam = { subject: '', date: '' };
  public exams: { subject: string; date: string }[] = [];
  public grades: { student: string; course: string; grade: string }[] = [];

  constructor(private sharedService: SharedService) {}

  attached() {
    this.role = this.sharedService.getRole();
    this.exams = this.sharedService.getExams();
    this.grades = this.sharedService.getGrades();
  }

  addExam() {
    if (this.newExam.subject && this.newExam.date) {
      this.sharedService.addExam({ ...this.newExam });
      this.exams = this.sharedService.getExams();
      this.newExam = { subject: '', date: '' }; // Reset form
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
}
