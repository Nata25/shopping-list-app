import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  mode: string;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.mode = params.id ? 'edit' : 'new';
    })
  }

}
