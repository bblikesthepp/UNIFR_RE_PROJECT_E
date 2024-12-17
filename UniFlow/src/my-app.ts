import { customElement } from 'aurelia';
import { RouterConfiguration, Router, IRouteableComponent, IRoute } from '@aurelia/router';
import template from './my-app.html';

import { Login } from './views/login/login';
import { CourseManager } from './views/course-manager/course-manager';

@customElement({ name: 'my-app', template })
export class MyApp implements IRouteableComponent{

    static routes: IRoute[] = [
        { 
          path: '', 
          redirectTo: 'login', 
          title: 'Login'
        },
        { 
          path: 'login', 
          component: Login, 
          title: 'Login' 
        },
        { 
          path: 'dashboard/:username/:role', 
          component: () => import('./views/dashboard/dashboard'), 
          title: 'Dashboard',
        //  children: [CourseManager]
        },
        { 
          path: 'course-manager', 
          component: () => import('./views/course-manager/course-manager'), 
          title: 'Course Manager'
        },
        { 
          path: '/*404', 
          component: () => import('./resources/fourohfour-page'), 
          title: '404 '
        },
        { 
          path: 'account', 
          component: () => import('./views/account/account'), 
          title: 'My Account '
        },
        { 
          path: 'my-schedule', 
          component: () => import('./views/schedule-manager/my-schedule'), 
          title: 'My Schedule '
        },
        { 
          path: 'exam-manager', 
          component: () => import('./views/exam-manager/exam-manager'), 
          title: 'Manage Exams '
        },
        { 
          path: 'notifs', 
          component: () => import('./views/notifications/notifs'), 
          title: 'My Notifications '
        },
        
      ];


    
}
