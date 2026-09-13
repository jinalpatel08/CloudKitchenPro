import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  userId = '';
  user: any = null;
  totalUsers = 0;
  totalRecipes = 0;
  totalInventory = 0;
  fullname = '';
  role = '';
  message = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // get logged in user
    const current = this.auth.getCurrentUser();
    if (!current) {
      this.message = 'please log in first';
      this.router.navigate(['/login']);
      return;
    }

    this.userId = current.userId;

    // call backend dashboard api
    this.http.get<any>(`http://localhost:8080/api/dashboard-35495146?userId=${this.userId}`)
      .subscribe({
        next: (res) => {
          if (res.success) {
            // update dashboard stats
            this.totalUsers = res.stats.totalUsers;
            this.totalRecipes = res.stats.totalRecipes;
            this.totalInventory = res.stats.totalInventory;
            this.fullname = res.stats.fullname;
            this.role = res.stats.role;
            this.user = res.stats;
          } else {
            this.message = res.error || 'could not load stats';
          }
        },
        error: (err) => {
          this.message = err.error?.error || 'something went wrong while loading dashboard';
        }
      });
  }

  // navigate to other pages
  goTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: 'preserve' });
  }
}
