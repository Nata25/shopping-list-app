import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  constructor(private _shoppingListService: ShoppingListService) { }
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  ngOnInit(): void {
  }

  addIngredient (): void {
    if (this.nameInput && this.nameInput.nativeElement.value
        && this.amountInput && this.amountInput.nativeElement.value) {
      const ingredient: Ingredient = {
        name: this.nameInput.nativeElement.value,
        amount: +this.amountInput.nativeElement.value
      }
      this._shoppingListService.addIngredient(ingredient)
    }
  }
}
