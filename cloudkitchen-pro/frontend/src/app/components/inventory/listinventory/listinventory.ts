import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventory } from '../../../services/inventory.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-listinventory',
  standalone: true,
  templateUrl: './listinventory.html',
  styleUrls: ['./listinventory.css'],
  imports: [CommonModule, FormsModule],
})
export class ListInventory implements OnInit {

  private inventoryService = inject(Inventory);
  private auth = inject(AuthService);
  private router = inject(Router);

  items = signal<any[]>([]);
  message = signal('');

  // filters and sort
  search = signal('');
  category = signal('');
  location = signal('');
  sortBy = signal<'expirationDate' | 'quantity' | 'createdDate' | ''>('');

  ngOnInit() {
    this.load();
  }

  load() {
    const user = this.auth.currentUser();
    if (!user) return;

    this.inventoryService.getInventory(user.userId).subscribe({
      next: (res: any) => {
        const list = res.items || res.inventory || res;
        this.items.set(Array.isArray(list) ? list : []);
      },
      error: (_) => this.message.set('failed to load inventory.')
    });
  }

  // filters + sorting logic
  filtered = computed(() => {
    let rows = [...this.items()];

    // search by name
    const q = this.search().trim().toLowerCase();
    if (q) rows = rows.filter(r => (r.ingredientName || '').toLowerCase().includes(q));

    // filter by category
    if (this.category()) rows = rows.filter(r => r.category === this.category());

    // filter by location
    if (this.location()) rows = rows.filter(r => r.location === this.location());

    // sorting
    switch (this.sortBy()) {
      case 'expirationDate':
        rows.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
        break;
      case 'quantity':
        rows.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0));
        break;
      case 'createdDate':
        rows.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
      default:
        break;
    }
    return rows;
  });

  // total value (quantity * cost)
  totalValue = computed(() =>
    this.filtered().reduce((sum, it) => sum + Number(it.quantity || 0) * Number(it.cost || 0), 0)
  );

  isExpired(it: any): boolean {
    return new Date(it.expirationDate) < new Date();
  }

  isNearExpiry(it: any): boolean {
    const today = new Date();
    const exp = new Date(it.expirationDate);
    const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  }

  isLowStock(it: any): boolean {
    return Number(it.quantity || 0) < 3;
  }

  // navigate to view page
  view(id: string) {
    this.router.navigate(['/view-inventory', id]);
  }

  // edit page
  edit(id: string) {
    this.router.navigate(['/edit-inventory', id]);
  }

  // delete item
  delete(id: string) {
    const user = this.auth.currentUser();
    if (!user) return;
    if (!confirm('delete this inventory item?')) return;

    this.inventoryService.deleteItem(id, user.userId).subscribe({
      next: () => this.load(),
      error: () => this.message.set('failed to delete item.')
    });
  }
}
