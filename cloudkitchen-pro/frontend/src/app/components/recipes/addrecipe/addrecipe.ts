import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Recipe } from '../../../services/recipe.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addrecipe.html',
  styleUrls: ['./addrecipe.css']
})
export class AddRecipe {

  recipeData: any = {}
  message = ''

  constructor(
    private recipe: Recipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // submit new recipe
  submit() {
    const userId = this.route.snapshot.queryParamMap.get('userId')
    if (!userId) {
      this.message = 'user id missing.'
      return
    }

    const recipePayload = { ...this.recipeData, userId }

    this.recipe.addRecipe(recipePayload).subscribe({
      next: () => {
        this.message = 'recipe added successfully!'
        setTimeout(() => {
          this.router.navigate(['/recipes'], { queryParams: { userId } })
        }, 1000)
      },
      error: () => {
        this.message = 'failed to add recipe.'
      }
    })
  }
}
