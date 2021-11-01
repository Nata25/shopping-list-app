import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  constructor(private _shoppingListService: ShoppingListService) { }
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;

  ngOnInit(): void {
  }

  addIngredient (form: NgForm): void {
    const { value } = form;
    const ingredient: Ingredient = {
      name: value.name,
      amount: +value.amount
    }
    this._shoppingListService.addIngredient(ingredient);
  }
}
