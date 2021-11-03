import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

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

  private populateIngredients (recipeToEdit: Recipe): FormArray {
    const ingredients = new FormArray([]);
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
    return ingredients;
  }

  private initForm () {
    const emptyForm = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: new FormArray([])
    };
    let recipeForm = { ...emptyForm };

    if (this.mode === 'edit') {
      const recipeToEdit = this._recipeService.getRecipeById(this.id);
      if (recipeToEdit) {
        const { name, imagePath, description } = recipeToEdit;
        let ingredients: FormArray;
        if (recipeToEdit.ingredients) {
          ingredients = this.populateIngredients(recipeToEdit);
        }
        recipeForm = { name, imagePath, description, ingredients }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeForm.name, Validators.required),
      imagePath: new FormControl(recipeForm.imagePath, Validators.required),
      description: new FormControl(recipeForm.description, Validators.required),
      ingredients: recipeForm.ingredients
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
        amount: new FormControl(1, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
}
