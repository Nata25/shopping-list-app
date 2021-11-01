import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private _shoppingListService: ShoppingListService) { }

  @Input() recipe: Recipe;

  ngOnInit(): void {
  }

  toShoppingList (): void {
    console.log('toShoppingList')
    this._shoppingListService.addIngredients(this.recipe.ingredients);
  }

}
