import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  constructor() { }
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  ngOnInit(): void {
  }
  
  addIngredient (): void {
    if (this.nameInput && this.nameInput.nativeElement.value
        && this.amountInput && this.amountInput.nativeElement.value) {
      const ingredient: Ingredient = {
        name: this.nameInput.nativeElement.value,
        amount: +this.amountInput.nativeElement.value
      }
      this.ingredientAdded.emit(ingredient);
    }
  }
}
