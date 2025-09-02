import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../../../models/room.model';
import { RoomService } from '../../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent implements OnInit {
  room: Room = {name:'', capacity: 1, roomType: '', location: ''};
  
  pageMode: String | null = '';

  constructor (private route: ActivatedRoute, private router: Router, private roomService: RoomService) {}

  ngOnInit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    const id = this.route.snapshot.paramMap.get("id");
    if (this.pageMode == 'edit' && id) {
      this.roomService.getById(+id).subscribe({
        next: (data) => (this.room = data),
        error: () => this.router.navigate(['/rooms']),
      });
    } else if (this.pageMode == 'details' && id) {
      this.roomService.getById(+id).subscribe({
        next: (data) => (this.room = data),
        error: () => this.router.navigate(['/rooms']),
      })
    }
  }

  onSubmit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    if (this.pageMode == 'edit') {
      this.roomService.edit(this.room.id!, this.room).subscribe(() => {
        this.router.navigate(['/rooms']);
      })
    } else if (this.pageMode == 'add') {
      this.roomService.add(this.room).subscribe(() => {
        this.router.navigate(['/rooms']);
      })
    }
  }

  switchToEdit() {
    this.pageMode = 'edit';
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.delete(id).subscribe(() => {
        this.router.navigate(['/rooms']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/rooms']);
  }
}