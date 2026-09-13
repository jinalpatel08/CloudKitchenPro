import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Recipe } from '../../services/recipe.service'
import { AiService } from '../../services/ai.service'

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: any = null
  userId = ''
  analysisResult: string | null = null
  loading = false
  error = ''

  private route = inject(ActivatedRoute)
  private recipeService = inject(Recipe)
  private aiService = inject(AiService)

  ngOnInit() {
    const params = this.route.snapshot.queryParams
    this.userId = params['userId']
    const recipeId = params['recipeId']
    const analyse = params['analyse']

    // make sure recipeId and userId exist
    if (!this.userId || !recipeId) {
      this.error = 'invalid access.'
      return
    }

    // get the recipe details
    this.recipeService.getRecipeById(recipeId, this.userId).subscribe({
      next: (res: any) => this.recipe = res,
      error: () => this.error = 'could not load recipe.'
    })

    // if ?analyse=true then run automatically
    if (analyse) this.performAnalysis(recipeId)
  }

  performAnalysis(recipeId: string) {
    this.loading = true
    this.error = ''

    // send to ai service for analysis
    this.aiService.analyzeHealth(recipeId, this.userId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.analysisResult = res.analysis
        } else {
          this.error = res.error || 'analysis failed.'
        }
        this.loading = false
      },
      error: (err: any) => {
        console.error(err)
        this.error = 'analysis failed.'
        this.loading = false
      }
    })
  }

  onAnalyseClick() {
    if (this.recipe) {
      this.performAnalysis(this.recipe.recipeId)
    }
  }
}
