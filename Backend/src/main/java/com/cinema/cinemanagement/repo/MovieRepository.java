package com.cinema.cinemanagement.repo;

import com.cinema.cinemanagement.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByTitleAndDescriptionAndReleaseDateAndIdNot(String title, String description,
                                                              LocalDate releaseDate, Long id);
    boolean existsByTitleAndDescriptionAndReleaseDate(String title, String description, LocalDate releaseDate);
}