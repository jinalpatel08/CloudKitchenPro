import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  userId = ''

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser()
    if (user) this.userId = user.userId
  }

  // logout user
  logout() {
    const user = this.auth.getCurrentUser()
    if (!user) return

    this.auth.logout(user.userId).subscribe(() => {
      this.auth.clearUser()
      this.router.navigate(['/login'])
    })
  }

  // go to page and keep query params
  goTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: 'preserve' })
  }
}
