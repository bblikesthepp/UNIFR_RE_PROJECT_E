// user-service.ts
import { singleton } from 'aurelia';


@singleton()
export class SharedService {
  

  private role: string = 'unknown';  // default role
  private username: string = '';

  private courses: Course[] = [
    { id: '1', name: 'Computer Science 101', description: 'Introduction to Computer Science.' },
    { id: '2', name: 'Mathematics 101', description: 'Introduction to Algebra.' },
    { id: '3', name: 'Computer Architecture', description: 'Learn about CPU design and memory hierarchy.' },
  ];

  public setUser(username: string, role: string): void {
    this.username = username;
    this.role = role;
  }

  public getUser(): { username: string, role: string } {
    return { username: this.username, role: this.role };
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public getRole(): string {
    return this.role;
  }

  public getCourses(): Course[] {
    return this.courses;
  }

  public addCourse(course: Course): void {
    this.courses.push(course);
  }
}

export interface Course {
  id: string;
  name: string;
  description: string;
}
