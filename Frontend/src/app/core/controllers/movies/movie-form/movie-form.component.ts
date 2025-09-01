import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movie: Movie = { title: '', description: '', genre: '', director: '', cast: '', language: '', duration: 1,
                   releaseDate: new Date(), posterUrl: ''};

  pageMode: String | null = '';

  constructor (private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    const id = this.route.snapshot.paramMap.get('id');
    if(this.pageMode == 'edit' && id) {
      this.pageMode = 'edit';
      this.movieService.getById(+id).subscribe({
        next: (data) => (this.movie = data),
        error: () => this.router.navigate(['/']),
      });
    } else if(this.pageMode == 'details' && id) {
      this.pageMode = 'details';
      this.movieService.getById(+id).subscribe({
        next: (data) => (this.movie = data),
        error: () => this.router.navigate(['/']),
      });
    }
  }

  onSubmit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    if (this.pageMode == 'edit') {
      this.movieService.edit(this.movie.id!, this.movie).subscribe(() => {
        this.router.navigate(['/']);
      })
    } else if (this.pageMode == 'add') {
      this.movieService.add(this.movie).subscribe(() => {
        this.router.navigate(['/']);
      })
    }
  }

  switchToEdit() {
    this.pageMode = 'edit';
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.delete(id).subscribe(() => {
        this.router.navigate(['/']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/'])
  }
}