package com.cinema.cinemanagement.service;

import com.cinema.cinemanagement.exception.MovieDuplicateException;
import com.cinema.cinemanagement.exception.MovieNotFoundException;
import com.cinema.cinemanagement.model.Movie;
import com.cinema.cinemanagement.repo.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id).
                orElseThrow(() -> new MovieNotFoundException("Movie with the id " + id + " not found."));
    }

    public Movie addMovie(Movie movie) {
        if(movieRepository.existsByTitleAndDescriptionAndReleaseDate(movie.getTitle(), movie.getDescription(),
                movie.getReleaseDate())) {
            throw new MovieDuplicateException("A movie with the same title and description and release date already exists.");
        }
        return movieRepository.save(movie);
    }

    public Movie editMovie(Long id, Movie updatedMovie) {
        Movie existing = getMovieById(id);
        boolean isDuplicate = movieRepository.existsByTitleAndDescriptionAndReleaseDateAndIdNot(
                updatedMovie.getTitle(), updatedMovie.getDescription(), updatedMovie.getReleaseDate(), id);

        if (isDuplicate) {
            throw new MovieDuplicateException("A movie with the same title and description and release date already exists.");
        }

        existing.setTitle(updatedMovie.getTitle());
        existing.setDescription(updatedMovie.getDescription());
        existing.setGenre(updatedMovie.getGenre());
        existing.setDirector(updatedMovie.getDirector());
        existing.setCast(updatedMovie.getCast());
        existing.setLanguage(updatedMovie.getLanguage());
        existing.setDuration(updatedMovie.getDuration());
        existing.setReleaseDate(updatedMovie.getReleaseDate());
        existing.setPosterUrl(updatedMovie.getPosterUrl());
        return movieRepository.save(existing);
    }

    public void deleteMovie(Long id) {
        if(!movieRepository.existsById(id)) {
            throw new MovieNotFoundException("Cannot delete. Movie with the id " + id + " does not exist.");
        }
        movieRepository.deleteById(id);
    }
}