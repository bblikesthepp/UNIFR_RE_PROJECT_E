import { IRouteableComponent, IRouter, IRoute, Router } from '@aurelia/router';
import template from './dashboard.html';
import { resolve, inject, CustomElement } from 'aurelia';
import { SharedService } from '../../resources/shared-service';
import { customElement } from '@aurelia/runtime-html';



@inject(SharedService)
@customElement({ 
  name: 'dashboard',
  template
})
export class Dashboard implements IRouteableComponent {
  public title = 'Dashboard';
  private router: IRouter = resolve(IRouter);
  public username: string = '';
  public role = 'student';
  public showDiv: boolean = false;
  isBackButton: boolean = false;  //  show 'Course Manager' or 'Back' button
  public showTitle: boolean = true;  // show/hide the title

  constructor(private sharedService: SharedService) {}

  
  async loading(params: { username: string, role:string }): Promise<void> {
    if (params && params.username) {
      this.username = params.username; // get username from route
      this.role = params.role; // get role from route
      this.sharedService.setUser(this.username, this.role); 
      this.updateTitle(); 
    }
  }

  private updateTitle() {
    this.title = this.role === 'student' ? 'Student Dashboard' : 'Teacher Dashboard';
  }

  public redirect(route: string): void {
    this.router.load(route).catch(err => {
      console.error('Navigation error:', err);
    });
  }


  public toggleCourseManager(): void {
      this.showDiv = true;
      this.showTitle = false;
  }    

  
    
}

