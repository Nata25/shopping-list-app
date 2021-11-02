import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/recipes/recipe.service';

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

  get controls () {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
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
                name: new FormControl(ing.name),
                amount: new FormControl(ing.amount),
              })
            )
          }
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImg),
      description: new FormControl(description),
      ingredients
    })
  }

  onSubmit () {
    console.log(this.recipeForm);
  }

  addIngredient () {
    this.controls.push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    )
  }
}
