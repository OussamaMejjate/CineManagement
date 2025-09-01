package com.cinema.cinemanagement.exception;

public class MovieDuplicateException extends RuntimeException {
    public MovieDuplicateException(String message) {
        super(message);
    }
}
