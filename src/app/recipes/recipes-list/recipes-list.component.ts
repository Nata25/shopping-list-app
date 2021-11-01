import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[];
  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes();
  }
  
  onNewRecipe () {
    this._router.navigate(['new'], { relativeTo: this._route});
  }
}
