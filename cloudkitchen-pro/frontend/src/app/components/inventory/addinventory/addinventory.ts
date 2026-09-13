import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../../services/inventory.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addinventory.html',
  styleUrls: ['./addinventory.css']
})
export class AddInventory {

  // inventory form data
  inventoryData: any = {
    ingredientName: '',
    quantity: 0,
    unit: '',
    category: '',
    purchaseDate: '',
    expirationDate: '',
    location: '',
    cost: 0
  };

  message = '';

  constructor(
    private inventory: Inventory,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    const user = this.auth.getCurrentUser();
    const userId = user?.userId;

    // check login
    if (!userId) {
      this.message = 'User not logged in. please log in again.';
      return;
    }

    const itemWithUser = { ...this.inventoryData, userId };

    // call backend to add item
    this.inventory.addItem(itemWithUser).subscribe({
      next: () => {
        this.message = 'Item added successfully!';
        setTimeout(() => {
          this.router.navigate(['/inventory'], { queryParams: { userId } });
        }, 1000);
      },
      error: (err) => {
        console.error('error adding inventory:', err);
        this.message = err?.error?.error || 'failed to add inventory item.';
      }
    });
  }
}
