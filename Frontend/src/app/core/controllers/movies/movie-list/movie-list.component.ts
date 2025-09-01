import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/movie.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAll().subscribe((data) => {
      this.movies = data;
    });
  }

  addMovie(): void {
    this.router.navigate(['/add'], { queryParams: { pageMode: 'add' } });
  }

  editMovie(id: number): void {
    this.router.navigate(['/edit', id], { queryParams: { pageMode: 'edit' } });
  }

  details(id: number): void {
    this.router.navigate(['/details', id], { queryParams: { pageMode: 'details' } });
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.delete(id).subscribe(() => {
        this.loadMovies();
      })
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}