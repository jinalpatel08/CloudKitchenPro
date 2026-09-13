import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = ''
  password = ''
  message = ''

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    // try logging in
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.auth.setCurrentUser(res.user)
          this.router.navigate(['/dashboard'], { queryParams: { userId: res.user.userId } })
        } else {
          this.message = res.error || 'login failed. try again.'
        }
      },
      error: (err) => {
        this.message = err.error?.error || 'login failed. check credentials.'
      }
    })
  }
}
