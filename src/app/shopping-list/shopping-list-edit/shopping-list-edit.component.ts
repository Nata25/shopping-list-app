import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { v4 as uuid} from 'uuid';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  mode: string = 'new';
  editedItemId: string;
  
  @ViewChild('form') shoppingListForm: NgForm;
  
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  
  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this._shoppingListService.listItemEdited.subscribe((id: string) => {
      this.mode = 'edit';
      this.editedItemId = id;
      const { name, amount } = this._shoppingListService.getIngredientById(id);
      this.shoppingListForm.setValue({ name, amount });
    });
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe();
  }

  submitIngredient (form: NgForm): void {
    const { value } = form;
    const ingredient: Ingredient = {
      name: value.name,
      amount: +value.amount,
      id: this.mode === 'edit' ? this.editedItemId : uuid()
    }
    switch (this.mode) {
      case 'new':
        this._shoppingListService.addIngredient(ingredient);
        break;
      case 'edit':
        this._shoppingListService.updateIngredient(ingredient);
        this.mode = 'new';
        break;
      }
    form.reset();
  }

  clearForm (form: NgForm): void {
    form.reset();
    this.mode = 'new';
  }
}
