import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(
    private _shoppingListService: ShoppingListService,
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  recipe: Recipe;
  id: string;

  ngOnInit(): void {
    this._route.params
      .subscribe((params: Params) => {
        this.recipe = this._recipeService.getRecipeById(params.id);
        this.id = params.id;
      });
  }

  toShoppingList (event: MouseEvent): void {
    event.preventDefault();
    this._shoppingListService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe () {
    this._recipeService.deleteRecipe(this.id);
    this._router.navigate(['recipes']);
  }
}
