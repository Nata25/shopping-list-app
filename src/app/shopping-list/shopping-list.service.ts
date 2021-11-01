import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
	ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
	
	ingredientsUpdated = new EventEmitter<Ingredient[]>();

	getIngredients () {
		return [...this.ingredients];
	}

	addIngredient (ing: Ingredient) {
		this.ingredients.push(ing);
		this.ingredientsUpdated.emit(this.getIngredients())
	}

	addIngredients (ings: Ingredient[]) {
		ings.forEach((ing: Ingredient) => {
			const existingIng = this.ingredients.find((savedIngredient: Ingredient) => {
				return savedIngredient.name === ing.name;
			})
			if (existingIng) {
				existingIng.amount += ing.amount;
			} else {
				this.ingredients.push(ing);
			}
		})
		this.ingredientsUpdated.emit([...this.ingredients]);
	}
}