import { Subject } from "rxjs";
import { v4 as uuid} from 'uuid';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
	ingredients: Ingredient[] = [
		new Ingredient(uuid(), 'Apples', 5),
    new Ingredient(uuid(), 'Tomatoes', 10),
  ];
	
	ingredientsUpdated = new Subject<Ingredient[]>();
	listItemEdited = new Subject<string>();

	getIngredients () {
		return [...this.ingredients];
	}

	getIngredientById (id: string) {
		return this.ingredients.find((ing: Ingredient) => ing.id === id);
	}

	addIngredient (ing: Ingredient) {
		this.ingredients.push({ ...ing, id: uuid()});
		this.ingredientsUpdated.next(this.getIngredients())
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
		this.ingredientsUpdated.next([...this.ingredients]);
	}

	updateIngredient (ing: Ingredient) {
		let updated = this.getIngredientById(ing.id);
		let updatedIndex: number;
		if (updated) {
			updatedIndex = this.ingredients.indexOf(updated);
			updated = {
				...ing,
				name: ing.name,
				amount: ing.amount
			}
			this.ingredients[updatedIndex] = updated;
			this.ingredientsUpdated.next([...this.ingredients]);
		}
	}

	deleteIngredient (id: string) {
		const ingredientToDelete = this.getIngredientById(id);
		const ind = this.ingredients.indexOf(ingredientToDelete);
		this.ingredients.splice(ind, 1);
		this.ingredientsUpdated.next([...this.ingredients]);
	}
}