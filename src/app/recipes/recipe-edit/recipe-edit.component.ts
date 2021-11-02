import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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

  private initForm () {
    let recipeName = '';
    let recipeImg = '';
    let description = '';
    if (this.mode === 'edit') {
      const recipeToEdit = this._recipeService.getRecipeById(this.id);
      if (recipeToEdit) {
        recipeName = recipeToEdit.name;
        recipeImg = recipeToEdit.imagePath;
        description = recipeToEdit.description;
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImg),
      description: new FormControl(description)
    })
  }

  onSubmit () {
    console.log(this.recipeForm);
  }
}
