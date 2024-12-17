import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import * as MDC from '@aurelia-mdc-web/all'; //MDC plugin 
import { RouterConfiguration } from '@aurelia/router';
import '@aurelia-mdc-web/all';

import { FourOhFour } from './resources/fourohfour-page';
import { Header } from './views/header/header';

Aurelia
  .register(RouterConfiguration.customize({useUrlFragmentHash:false, basePath:'/'}),
  MDC,
  FourOhFour,
  Header,
) 
  .app(MyApp)
  .start();
