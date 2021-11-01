import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  constructor() { }

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  ngOnInit(): void {
  }
  addIngredient (nameInput: HTMLInputElement, amountInput: HTMLInputElement): void {
    if (nameInput && nameInput.value && amountInput && amountInput.value) {
      const ingredient: Ingredient = {
        name: nameInput.value,
        amount: +amountInput.value
      }
      this.ingredientAdded.emit(ingredient);
    }
  }
}
