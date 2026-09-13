import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editinventory.html',
  styleUrls: ['./editinventory.css']
})
export class EditInventory implements OnInit {

  inventoryData: any = {};
  message = '';

  constructor(
    private inventory: Inventory,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const inventoryId = this.route.snapshot.paramMap.get('inventoryId');

    // load existing item details
    if (inventoryId && userId) {
      this.inventory.getItemById(inventoryId, userId).subscribe({
        next: (res: any) => {
          this.inventoryData = res;
        },
        error: () => {
          this.message = 'failed to load inventory item.';
        }
      });
    }
  }

  update() {
    const userId = this.route.snapshot.queryParamMap.get('userId');

    // check if userId exists
    if (!userId) {
      this.message = 'user id missing in query params.';
      return;
    }

    // send update request
    this.inventory.updateItem({ ...this.inventoryData, userId }).subscribe({
      next: () => {
        this.message = 'inventory item updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/inventory'], { queryParams: { userId } });
        }, 1000);
      },
      error: () => {
        this.message = 'failed to update item.';
      }
    });
  }
}
