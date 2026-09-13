import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Recipe } from '../../../services/recipe.service'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-viewrecipe',
  standalone: true,
  templateUrl: './viewrecipe.html',
  styleUrls: ['./viewrecipe.css'],
  imports: [CommonModule],
})
export class ViewRecipe implements OnInit {

  recipeData: any = null

  private recipeService = inject(Recipe)
  private auth = inject(AuthService)
  private route = inject(ActivatedRoute)

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('recipeId')
    const user = this.auth.currentUser()

    // fetch recipe details
    if (recipeId && user) {
      this.recipeService.getRecipeById(recipeId, user.userId).subscribe({
        next: (res) => this.recipeData = res.recipe || res,
        error: () => console.error('failed to load recipe')
      })
    }
  }
}
