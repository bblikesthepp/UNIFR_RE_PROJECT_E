import { customElement } from '@aurelia/runtime-html';
import template from './my-schedule.html';
import '@aurelia-mdc-web/all';

@customElement({
  name: 'my-schedule',
  template
})
export class MySchedule {
  public title: string = 'My Schedule';
  public schedule = [
    { time: '08:00 AM', course: 'Math 101' },
    { time: '10:00 AM', course: 'History 201' },
    { time: '01:00 PM', course: 'Physics 303' },
  ];
}