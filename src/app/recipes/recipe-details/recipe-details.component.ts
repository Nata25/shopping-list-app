import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private _route: ActivatedRoute
  ) { }

  subscription: Subscription;
  recipe: Recipe;

  ngOnInit(): void {
    this.subscription = this._route.params
      .subscribe((params: Params) => {
        this.recipe = this._recipeService.getRecipeById(params.id);
      });
  }

  toShoppingList (): void {
    console.log('toShoppingList')
    this._shoppingListService.addIngredients(this.recipe.ingredients);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
