import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  mode: string;
  recipeForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.mode = params.id ? 'edit' : 'new';
    })
    this.initForm();
  }

  get ingredientsArray () {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  private getId () {
    return this._recipeService.getRecipes.length;
  }

  private initForm () {
    let recipeName = '';
    let recipeImg = '';
    let description = '';
    let ingredients = new FormArray([]);
    if (this.mode === 'edit') {
      const recipeToEdit = this._recipeService.getRecipeById(this.id);
      if (recipeToEdit) {
        recipeName = recipeToEdit.name;
        recipeImg = recipeToEdit.imagePath;
        description = recipeToEdit.description;
        if (recipeToEdit.ingredients) {
          for (let ing of recipeToEdit.ingredients) {
            ingredients.push(
              new FormGroup({
                name: new FormControl(ing.name, Validators.required),
                amount: new FormControl(ing.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
              })
            )
          }
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients
    })
  }

  onSubmit () {
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
    let newRecipe: Recipe;
    if (this.mode === 'edit') {
      newRecipe = new Recipe(
        +this.id, name, description, imagePath, ingredients
      )
      this._recipeService.updateRecipe(newRecipe);
    } else {
      newRecipe = new Recipe(
        this.getId(), name, description, imagePath, ingredients
      )
      this._recipeService.addRecipe(newRecipe);
    }
  }

  addIngredient () {
    this.ingredientsArray.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
}
