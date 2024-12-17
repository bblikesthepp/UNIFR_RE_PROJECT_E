import { customElement } from '@aurelia/runtime-html';
import template from './account.html';
import '@aurelia-mdc-web/all';

import { SharedService } from '../../resources/shared-service';
import { inject } from 'aurelia';

@customElement({
  name: 'account',
  template
})
@inject(SharedService)
export class Account {
  public title: string = 'Account';
  public username = '';
  public role = '';
  activeSection: string | null = null;
  enrolledCourses: any[] = [];


  constructor(private sharedService: SharedService) {}
 
  async loading(params: { username: string }): Promise<void> {
    this.username = params.username;
    this.role = this.sharedService.getRole();
    this.enrolledCourses = this.sharedService.getEnrolledCourses(this.username).map(courseId => {
      return this.sharedService.getCourses().find(c => c.id === courseId);
    }).filter(Boolean);    

  }

  showSection(section: string) {
    this.activeSection = section; 
  }
}