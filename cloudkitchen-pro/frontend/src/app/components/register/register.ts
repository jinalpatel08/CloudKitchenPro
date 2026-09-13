import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  user: User = { userId: '', email: '', password: '', fullname: '', role: 'chef', phone: '' }
  message = ''

  constructor(private auth: AuthService) {}

  // register user
  submit() {
    this.auth.register(this.user).subscribe({
      next: () => {
        this.message = 'registration successful! please login.'
      },
      error: () => {
        this.message = 'registration failed. try again.'
      }
    })
  }
}
