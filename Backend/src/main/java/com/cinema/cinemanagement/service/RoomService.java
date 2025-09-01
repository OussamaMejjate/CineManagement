package com.cinema.cinemanagement.service;

import com.cinema.cinemanagement.exception.RoomDuplicateException;
import com.cinema.cinemanagement.exception.RoomNotFoundException;
import com.cinema.cinemanagement.model.Room;
import com.cinema.cinemanagement.repo.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RoomNotFoundException("Room with id " + id + " not found."));
    }

    public Room addRoom(Room room) {
        if(roomRepository.existsByName(room.getName())) {
            throw new RoomDuplicateException("A room with that name already exists.");
        }
        return roomRepository.save(room);
    }

    public Room editRoom(Long id, Room updatedRoom) {
        Room existing = getRoomById(id);

        if(roomRepository.existsByName(updatedRoom.getName())) {
            throw new RoomDuplicateException("A room with that name already exists.");
        }

        existing.setName(updatedRoom.getName());
        existing.setCapacity(updatedRoom.getCapacity());
        existing.setRoomType(updatedRoom.getRoomType());
        existing.setLocation(updatedRoom.getLocation());

        return roomRepository.save(existing);
    }

    public void deleteRoom(Long id) {
        if(!roomRepository.existsById(id)) {
            throw new RoomNotFoundException("Cannot delete. Room with id " + id + " does not exist.");
        }
        roomRepository.deleteById(id);
    }
}