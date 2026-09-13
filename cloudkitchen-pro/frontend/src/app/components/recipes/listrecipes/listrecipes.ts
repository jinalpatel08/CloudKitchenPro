import { Component, inject, OnInit, signal } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Recipe } from '../../../services/recipe.service'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-listrecipes',
  standalone: true,
  templateUrl: './listrecipes.html',
  styleUrls: ['./listrecipes.css'],
  imports: [CommonModule],
})
export class ListRecipes implements OnInit {

  recipes: any[] = []
  message = signal('')

  private recipeService = inject(Recipe)
  private auth = inject(AuthService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  ngOnInit() {
    this.loadRecipes()
  }

  // load all recipes for current user
  loadRecipes() {
    const user = this.auth.currentUser()
    if (!user) return

    this.recipeService.getRecipes(user.userId).subscribe({
      next: (res: any) => this.recipes = res.recipes || res,
      error: () => this.message.set('failed to load recipes.')
    })
  }

  viewRecipe(id: string) {
    this.router.navigate(['/view-recipe', id])
  }

  editRecipe(id: string) {
    this.router.navigate(['/edit-recipe', id])
  }

  deleteRecipe(id: string) {
    const user = this.auth.currentUser()
    if (!user) return

    if (confirm('delete this recipe?')) {
      this.recipeService.deleteRecipe(id, user.userId).subscribe({
        next: () => this.loadRecipes(),
        error: () => this.message.set('failed to delete recipe.')
      })
    }
  }

  // health analysis using gemini
  analyseHealth(recipeId: string) {
    const user = this.auth.currentUser()
    if (!user) return

    this.router.navigate(['/recipe-detail'], {
      queryParams: { userId: user.userId, recipeId, analyse: true }
    })
  }

  // translation page
  translateRecipe(recipeId: string) {
    const user = this.auth.currentUser()
    if (!user) return

    this.router.navigate(['/translate-recipe'], {
      queryParams: { recipeId, userId: user.userId }
    })
  }
}
