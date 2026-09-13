import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Recipe } from '../../../services/recipe.service'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-editrecipe',
  standalone: true,
  templateUrl: './editrecipe.html',
  styleUrls: ['./editrecipe.css'],
  imports: [FormsModule, CommonModule],
})
export class EditRecipe implements OnInit {

  message = ''
  recipeData: any = {}

  private recipeService = inject(Recipe)
  private auth = inject(AuthService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('recipeId')
    const user = this.auth.currentUser()

    // load recipe data
    if (recipeId && user) {
      this.recipeService.getRecipeById(recipeId, user.userId).subscribe({
        next: (res) => this.recipeData = res.recipe || {},
        error: () => this.message = 'failed to load recipe.'
      })
    }
  }

  submit() {
    const user = this.auth.currentUser()
    if (!user) {
      this.message = 'user not logged in.'
      return
    }

    const data = { ...this.recipeData, userId: user.userId }

    this.recipeService.updateRecipe(data).subscribe({
      next: () => {
        alert('recipe updated successfully!')
        this.router.navigate(['/recipes'], { queryParams: { userId: user.userId } })
      },
      error: () => this.message = 'failed to update recipe.'
    })
  }
}
