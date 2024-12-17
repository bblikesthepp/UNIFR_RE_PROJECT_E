import { customElement } from '@aurelia/runtime-html';
import template from './my-schedule.html';
import '@aurelia-mdc-web/all';
import { inject } from 'aurelia';
import { SharedService, Course } from '../../resources/shared-service';

@inject(SharedService)
@customElement({
  name: 'my-schedule',
  template,
})
export class MySchedule {
  public title: string = 'My Schedule';
  public schedule: { day: string; time: string; course: string }[] = [];

  private weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(private sharedService: SharedService) {}

  attached() {
    const timeSlots = ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'];
    const username = this.sharedService.getUser().username;

    const courses = this.sharedService.getCourses();
    const enrolledCourses = this.sharedService.getEnrolledCourses(username);


    // automatically put courses into the schedule
    this.schedule = enrolledCourses
    .map(courseId => this.sharedService.getCourses().find(course => course.id === courseId)) // get full Course objects
    .filter((course): course is Course => !!course) // filter out any undefined values
    .map((course, index) => ({
      day: this.weekDays[index % this.weekDays.length], // rotate through weekdays
      time: timeSlots[index % timeSlots.length],       // rotate through time slots
      course: course.name,
    }));
  
  } 
}
