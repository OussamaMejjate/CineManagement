import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LoginRequest } from "../../models/user.model";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginRequest = { username: '', password: '' };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginData.username && this.loginData.password) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/movies']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.error?.error || 'Login failed. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}