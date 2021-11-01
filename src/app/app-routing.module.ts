import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeDetailsFallbackComponent } from './recipes/recipe-details-fallback/recipe-details-fallback.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeDetailsFallbackComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailsComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: '',
    component: RecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
