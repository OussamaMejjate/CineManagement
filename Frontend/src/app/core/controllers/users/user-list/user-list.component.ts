import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }

  add(): void {
    this.router.navigate(['/users/add'], { queryParams: { pageMode: 'add' } });
  }

  edit(id: number): void {
    this.router.navigate(['/users/edit', id], { queryParams: { pageMode: 'edit' } });
  }

  details(id: number): void {
    this.router.navigate(['/users/details', id], { queryParams: { pageMode: 'details' } });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.userService.delete(id).subscribe(() => {
        this.loadUsers();
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