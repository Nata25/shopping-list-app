import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  ingredients: Ingredient[] = [];

  constructor (private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this._shoppingListService.getIngredients();
    this.subscription = this._shoppingListService.ingredientsUpdated.subscribe((data: Ingredient[]) => {
      this.ingredients = data;
    })
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onSelected (id: string): void {
    this._shoppingListService.listItemEdited.next(id);
  }
}
