import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { Recipe } from '../../services/recipe.service'
import { TranslateService } from '../../services/translate.service'

@Component({
  selector: 'app-translate-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './translate-recipe.html',
  styleUrls: ['./translate-recipe.css']
})
export class TranslateRecipeComponent implements OnInit {

  recipe: any = null
  userId = ''
  translatedData: any = null
  selectedLang = ''
  loading = false
  error = ''

  private route = inject(ActivatedRoute)
  private recipeService = inject(Recipe)
  private translateService = inject(TranslateService)

  ngOnInit() {
    const params = this.route.snapshot.queryParams
    this.userId = params['userId']
    const recipeId = params['recipeId']

    // make sure recipe and user are valid
    if (!this.userId || !recipeId) {
      this.error = 'invalid access.'
      return
    }

    this.recipeService.getRecipeById(recipeId, this.userId).subscribe({
      next: (res: any) => this.recipe = res.recipe || res,
      error: () => this.error = 'could not load recipe.'
    })
  }

  onTranslateClick() {
    if (!this.selectedLang) {
      this.error = 'please select a language.'
      return
    }

    if (!this.recipe) {
      this.error = 'recipe not loaded yet.'
      return
    }

    const recipeId =
      this.recipe?.recipeId ||
      this.recipe?.recipe?.recipeId ||
      this.recipe?._id

    if (!recipeId) {
      this.error = 'recipe id missing.'
      return
    }

    this.loading = true
    this.error = ''
    this.translatedData = null

    this.translateService.translateRecipe(recipeId, this.userId, this.selectedLang)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.translatedData = res.translatedRecipe
          } else {
            this.error = res.error || 'translation failed.'
          }
          this.loading = false
        },
        error: () => {
          this.error = 'translation failed.'
          this.loading = false
        }
      })
  }
}
