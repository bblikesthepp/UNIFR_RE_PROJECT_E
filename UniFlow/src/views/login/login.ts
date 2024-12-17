import { customElement } from '@aurelia/runtime-html';
import template from './login.html'; // template for the component

// For redirecting pages
import { IRouteableComponent, IRouter } from '@aurelia/router';
import { resolve } from 'aurelia';
import { SharedService } from '../../resources/shared-service';


@customElement({ 
  name: 'login',
  template
})

export class Login implements IRouteableComponent {
  private router: IRouter = resolve(IRouter);
  private isRegistering: boolean = false;
  private username: string = '';
  private password: string = '';
  private role: string = 'student'; 
  private isLoggedIn: boolean = false;

  private newUsername: string = '';
  private newPassword: string = '';
  private newRole: string = 'student'; 


  constructor() {
    this.isRegistering = false;
    this.username = '';
    this.password = '';
    this.role = 'student';
    this.isLoggedIn = false;
  }

  public async redirectTo(route: string): Promise<void> {
    if (this.router) {
      this.router.load(route).catch(err => console.error('Navigation error:', err));
    } else {
      console.error('Router is not injected!');
    }
  }
  
  toggleRegisterForm() {
    this.isRegistering = !this.isRegistering;
    this.password = '';
      // clear fields when toggling between forms
  if (!this.isRegistering) {
    this.newUsername = '';
    this.newPassword = '';
  }
  }

  // login based on selected user role
  login() {
   /* if (!this.sharedService) {
      console.error('SharedService is not defined!');
      return;
    }
    this.sharedService.username = this.username;
    */
    if (this.role === 'student') {
      // pass username as a parameter when navigating
      this.router.load(`/dashboard/${this.username}/${this.role}`).catch(err => {
        console.error('Navigation error:', err);
      });
      // this.sharedService.setRole('student');
    } else if (this.role === 'teacher') {
      this.router.load(`/dashboard/${this.username}/${this.role}`).catch(err => {
        console.error('Navigation error:', err);
      });
      //this.sharedService.setRole('teacher');
    }
   // console.log('HomePage.sharedService:', this.sharedService);
    console.log('Username before login:', this.username);

    this.isLoggedIn = true;  


  }

  register() {
   /* const route = this.role === 'student' ? `/student-dashboard/${this.username}` : `/teacher-dashboard/${this.username}`;
    this.router.load(route).catch(err => {
      console.error('Navigation error:', err);
    }); */ 
    this.isRegistering = false;
    this.username = this.newUsername;
    this.role = this.newRole;
    this.newUsername = '';
    this.newPassword = '';
  }

  logout() {
    this.router.load('/').catch(err => {
      console.error('Navigation error:', err);
    });

  }
}
