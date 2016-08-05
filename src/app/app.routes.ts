import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Search } from './search';

export const routes: RouterConfig = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'search', component: Search },
  { path: '**', redirectTo: 'home' }
];
