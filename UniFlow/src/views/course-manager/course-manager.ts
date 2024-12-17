import { customElement } from '@aurelia/runtime-html';
import { IRouteableComponent } from '@aurelia/router';
import { inject, resolve } from 'aurelia';
import template from './course-manager.html';
import { SharedService } from '../../resources/shared-service';

@inject(SharedService)
@customElement({
    name: 'course-manager',
    template
  })
  export class CourseManager implements IRouteableComponent {
    public username: string = '';
    public role: string = 'undefined';  


    constructor(private sharedService: SharedService) {}
  
 
    async loading(params: { username: string }): Promise<void> {
      console.log('Logged-in username:', params.username);
      this.username = params.username;
      this.role = this.sharedService.getRole();
    }
    
    courses: Course[] = [
      { id: '1', name: 'Computer Science 101', description: 'Introduction to Computer Science.' },
      { id: '2', name: 'Mathematics 101', description: 'Introduction to Algebra.' },
      // Add more courses as needed
  ];

  enroll(course: Course) {
      console.log(`Enrolled in course: ${course.name}`);
      // Implement enrollment logic here
  }
  }
  interface Course {
    id: string;
    name: string;
    description: string;
  }