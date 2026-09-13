import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from '../../../services/inventory.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-viewinventory',
  standalone: true,
  templateUrl: './viewinventory.html',
  styleUrls: ['./viewinventory.css'],
  imports: [CommonModule],
})
export class ViewInventory implements OnInit {

  private inventoryService = inject(Inventory);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  item: any = null;

  ngOnInit() {
    const inventoryId = this.route.snapshot.paramMap.get('inventoryId');
    const user = this.auth.currentUser();

    // check if user and item id exist
    if (!inventoryId || !user) return;

    // fetch the item
    this.inventoryService.getItemById(inventoryId, user.userId).subscribe({
      next: (res: any) => {
        this.item = res.item || res || null;
      },
      error: () => {
        this.item = null;
        console.error('failed to load inventory item');
      }
    });
  }
}
