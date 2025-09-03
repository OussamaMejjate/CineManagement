import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterRequest, User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User = {username: '', password: '', role: '', fullName: '', email: '', phoneNumber: '', status: ''};
  registeredUser: RegisterRequest = {username: '', password: '', role: '', fullName: '', email: '', phoneNumber: '', status: ''};

  pageMode: String | null = '';

  constructor (private route: ActivatedRoute, private router: Router, private userService: UserService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    const id = this.route.snapshot.paramMap.get('id');
    if (this.pageMode == 'edit' && id) {
      this.userService.getById(+id).subscribe({
        next: (data) => (this.user = data),
        error: () => this.router.navigate(['/users']),
      });
    } else if (this.pageMode == 'details' && id) {
      this.userService.getById(+id).subscribe({
        next: (data) => (this.user = data),
        error: () => this.router.navigate(['/users']),
      });
    }
  }

  onSubmit(): void {
    this.pageMode = this.route.snapshot.queryParamMap.get('pageMode');
    if (this.pageMode == 'edit') {
      this.userService.edit(this.user.id!, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      })
    } else if (this.pageMode == 'add') {
      this.authService.register(this.registeredUser).subscribe(() => {
        this.router.navigate(['/users']);
      })
    }
  }

  switchToEdit() {
    this.pageMode = 'edit';
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe(() => {
        this.router.navigate(['/users']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}