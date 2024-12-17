import { IRouter } from '@aurelia/router';
import { customElement, resolve } from 'aurelia';
import template from './header.html'; 

@customElement({ name: 'header-menu',
    template}) //dont forget to import this for view rendering
export class Header{
    private router: IRouter = resolve(IRouter);


    public toggleDropdown() {
        const dropdown = document.getElementById('mobile-menu');
        if (dropdown) {
          dropdown.classList.toggle('show'); 
        }
      }

      public goBack() {this.router.back}
}
