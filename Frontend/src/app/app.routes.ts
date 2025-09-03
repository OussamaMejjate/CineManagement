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
  { path: 'movies/add', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'movies/edit/:id', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'movies/details/:id', component: MovieFormComponent, canActivate: [authGuard] },

  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'users/add', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'users/details/:id', component: UserFormComponent, canActivate: [authGuard] },

  { path: 'rooms', component: RoomListComponent, canActivate: [authGuard] },
  { path: 'rooms/add', component: RoomFormComponent, canActivate: [authGuard] },
  { path: 'rooms/edit/:id', component: RoomFormComponent, canActivate: [authGuard] },
  { path: 'rooms/details/:id', component: RoomFormComponent, canActivate: [authGuard] },
  
  { path: '**', redirectTo: 'movies'}
];