import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscr: Subscription;

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes();
    this.subscr = this._recipeService.recipesChanged.subscribe((data: Recipe[]) => {
      this.recipes = data;
    })
  }
  
  onNewRecipe () {
    this._router.navigate(['new'], { relativeTo: this._route});
  }

  ngOnDestroy () {
    this.subscr.unsubscribe();
  }
}
