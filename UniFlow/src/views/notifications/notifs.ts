import { customElement } from '@aurelia/runtime-html';
import template from './notifs.html';
import '@aurelia-mdc-web/all';

@customElement({
  name: 'notifs',
  template
})
export class Notifications {
  public title: string = 'Notifications';
  public notifications = ['Assignment due tomorrow', 'Exam scheduled next week', 'Class canceled on Friday'];

}