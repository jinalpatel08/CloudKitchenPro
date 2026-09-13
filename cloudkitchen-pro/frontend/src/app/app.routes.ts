import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { ListRecipes } from './components/recipes/listrecipes/listrecipes';
import { AddRecipe } from './components/recipes/addrecipe/addrecipe';
import { EditRecipe } from './components/recipes/editrecipe/editrecipe';
import { ViewRecipe } from './components/recipes/viewrecipe/viewrecipe';
import { ListInventory } from './components/inventory/listinventory/listinventory';
import { AddInventory } from './components/inventory/addinventory/addinventory';
import { EditInventory } from './components/inventory/editinventory/editinventory';
import { NotFound } from './components/notfound/notfound';
import { AuthGuard } from './guards/auth-guard';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail';
import { TranslateRecipeComponent } from './components/translate-recipe/translate-recipe';



export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'recipes', component: ListRecipes, canActivate: [AuthGuard] },
  { path: 'add-recipe', component: AddRecipe, canActivate: [AuthGuard] },
  { path: 'edit-recipe/:recipeId', component: EditRecipe, canActivate: [AuthGuard] },
  { path: 'view-recipe/:recipeId', component: ViewRecipe, canActivate: [AuthGuard] },
  { path: 'inventory', component: ListInventory, canActivate: [AuthGuard] },
  { path: 'add-inventory', component: AddInventory, canActivate: [AuthGuard] },
  { path: 'edit-inventory/:inventoryId', component: EditInventory, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'recipe-detail', component: RecipeDetailComponent },
  { path: 'translate-recipe', component: TranslateRecipeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFound }

];
