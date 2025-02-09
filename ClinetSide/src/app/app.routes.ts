import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Register route
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to 'home'
  { path: 'home', component: HomeComponent }, // Home route
  { path: '**', redirectTo: 'home' }, // Wildcard route for undefined paths
];

export { routes };
