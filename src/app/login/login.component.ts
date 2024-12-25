import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserLoginProjection } from "../models/userloginprojection.model";

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoginService],
})
export class LoginComponent {
  loginForm: FormGroup;
  message : string = '';

  constructor(private fb: FormBuilder, private authService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username
      password: ['', [Validators.required, Validators.minLength(6)]], // Password
    });
  }

//   login() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;

//       this.authService.login({ username, password }).subscribe(
//         (roles: UserLoginProjection[]) => {
//           // Check if any role has "Admin" as roleName
//           const isAdmin = roles.some(role => role.roleName.toLowerCase() === 'admin');

//           if (isAdmin) {
//             this.router.navigate(['/admin']);
//           } else {
//             this.router.navigate(['/employee']);
//           }
//           sessionStorage.setItem('roles', JSON.stringify(roles));
//         },
//         (error) => {
//           this.message = "Bad Credentials";
//         }
//       );
//     } else {
//       console.error('Form is invalid');
//     }
//   }
// }


login() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe(
      (roles: UserLoginProjection[]) => {
        // Handle success response (navigate based on roles)
        const isAdmin = roles.some(role => role.roleName.toLowerCase() === 'admin');

        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/employee']);
        }
        sessionStorage.setItem('roles', JSON.stringify(roles));
      },
      (error) => {
        // Show error message when login fails
        this.message = "Bad Credentials";  // You can also log the error for debugging
        console.error('Login failed: ', error);
      }
    );
  } else {
    console.error('Form is invalid');
  }
}}
