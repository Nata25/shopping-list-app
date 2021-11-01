import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[];
  constructor(private _recipeService: RecipeService) { }

  @Output() onRecipeSelected = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes();
    this.onRecipeSelected.emit(this.recipes[0]);
  }
}
