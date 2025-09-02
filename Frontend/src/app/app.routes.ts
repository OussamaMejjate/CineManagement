import { Routes } from '@angular/router';
import { MovieListComponent } from './core/controllers/movies/movie-list/movie-list.component';
import { MovieFormComponent } from './core/controllers/movies/movie-form/movie-form.component';
import { UserListComponent } from './core/controllers/users/user-list/user-list.component';
import { UserFormComponent } from './core/controllers/users/user-form/user-form.component';
import { RoomListComponent } from './core/controllers/rooms/room-list/room-list.component';
import { RoomFormComponent } from './core/controllers/rooms/room-form/room-form.component';
import { LoginComponent } from './core/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},

  { path: 'movies', component: MovieListComponent, canActivate: [authGuard] },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'rooms', component: RoomListComponent, canActivate: [authGuard] },
  { path: 'add', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'details/:id', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'users/add', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'users/details/:id', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'rooms/add', component: RoomFormComponent, canActivate: [authGuard] },
  { path: 'rooms/edit/:id', component: RoomFormComponent, canActivate: [authGuard] },
  { path: 'rooms/details/:id', component: RoomFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'movies'}
];

/*
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes (require authentication)
  { path: '', component: MovieListComponent, canActivate: [authGuard] },
  { path: 'details/:id', component: MovieDetailsComponent, canActivate: [authGuard] },
  
  // Admin-only routes
  { path: 'add', component: MovieFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'edit/:id', component: MovieFormComponent, canActivate: [authGuard, adminGuard] },
  
  // Redirect unknown routes to home
  { path: '**', redirectTo: '' }
];
*/