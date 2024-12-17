import { customElement } from '@aurelia/runtime-html';
import { IRouteableComponent } from '@aurelia/router';
import { inject, resolve } from 'aurelia';
import template from './course-manager.html';
import { SharedService, Course } from '../../resources/shared-service';

@inject(SharedService)
@customElement({
    name: 'course-manager',
    template
  })
  export class CourseManager implements IRouteableComponent {
    public username: string = '';
    public role: string = 'undefined';  
    public showAvailableCourse: boolean= false;

    public newCourse: Course = { id: '', name: '', description: '' };
    public courses: Course[] = [];
    public enrolledCourses: Course[] = []; 


    constructor(private sharedService: SharedService) {}
  
 
    async loading(params: { username: string }): Promise<void> {
      console.log('Logged-in username:', params.username);
      this.username = params.username;
      this.role = this.sharedService.getRole();
      this.courses = this.sharedService.getCourses();

      const enrolledCourseIds = this.sharedService.getEnrolledCourses(this.username);

      this.enrolledCourses = enrolledCourseIds
        .map(courseId => this.courses.find(c => c.id === courseId)!)
        .filter(Boolean); // ensure no null values
    }

  enroll(course: any) {
    this.sharedService.enrollStudent(this.username, course.id);
    this.enrolledCourses.push(course);
    alert(`You have enrolled in: ${course.name}`);


  }

  public showAvailableCourses() {
    this.showAvailableCourse = true;
  }

  addCourse(): void {
    if (this.newCourse.name && this.newCourse.description) {
      this.newCourse.id = (this.courses.length + 1).toString(); // Simple ID assignment
      this.sharedService.addCourse({ ...this.newCourse });
      this.newCourse = { id: '', name: '', description: '' }; // Reset form
      alert('New course added successfully!');
    } else {
      alert('Please provide both a course name and description.');
    }
  }
  }
 