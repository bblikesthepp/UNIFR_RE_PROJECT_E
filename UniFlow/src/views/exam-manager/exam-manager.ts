import { customElement } from '@aurelia/runtime-html';
import template from './exam-manager.html';
import '@aurelia-mdc-web/all';

@customElement({
  name: 'exam-manager',
  template
})
export class ExamManager {
  public title: string = 'Exam Manager';
  public exams = [
    { subject: 'Math', date: '2024-12-20' },
    { subject: 'History', date: '2024-12-22' },
    { subject: 'Physics', date: '2024-12-23' },
  ];
}