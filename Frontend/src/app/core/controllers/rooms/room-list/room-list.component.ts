import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../../models/room.model';
import { RoomService } from '../../../services/room.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-list',
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private router: Router, private roomService: RoomService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAll().subscribe((data) => {
      this.rooms = data;
    })
  }

  add(): void {
    this.router.navigate(['/rooms/add'], { queryParams: { pageMode: 'add' } });
  }

  edit(id: number): void {
    this.router.navigate(['/rooms/edit', id], { queryParams: { pageMode: 'edit' } });
  }

  details(id: number): void {
    this.router.navigate(['/rooms/details', id], { queryParams: { pageMode: 'details' } });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.delete(id).subscribe(() => {
        this.loadRooms();
      })
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}