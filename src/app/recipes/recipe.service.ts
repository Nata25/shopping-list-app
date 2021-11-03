import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { v4 as uuid} from 'uuid';
import { Subject } from "rxjs";

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[]	= [
		new Recipe(
			0,
			'Mediterranian Chopped salad',
			'The great thing about chopped salads is that you can pretty much chop whatever vegetables you want and throw them all together.',
			'https://i2.wp.com/www.primaverakitchen.com/wp-content/uploads/2017/06/Easy-Mediterranean-Chopped-Salad-3.jpg',
			[
				new Ingredient(uuid(), 'Corn', 1),
				new Ingredient(uuid(), 'Tomatoes', 1),
			]
		),
    new Recipe(
			1,
			'Lemon Salad',
    	'This salad gets tossed in a zingy lemon dressing that doesn’t play by the rules. ',
    	'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_1460,h_1825/k%2FPhoto%2FSeries%2F2021-08-make-ahead-salads%2FMake-Ahead-Salad_Chopped-veggie%2F2021-07-28_ATK-3856',
			[
				new Ingredient(uuid(), 'Lemon', 1),
				new Ingredient(uuid(), 'Olive', 10),
			])
	]

	getRecipes () {
		return [...this.recipes];
	}

	getNextId () {
		return this.recipes.length;
	}

	getRecipeById (id: string) {
		return this.recipes.find(r => r.id === +id);
	}

	addRecipe (recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next([...this.recipes]);
	}

	updateRecipe (recipe: Recipe) {
		const recipeToUpdate = this.getRecipeById(recipe.id.toString());
		if (recipeToUpdate) {
			const ind = this.recipes.indexOf(recipeToUpdate);
			this.recipes[ind] = recipe;
			this.recipesChanged.next([...this.recipes]);
		}
	}

	deleteRecipe (id: string) {
		const recipeToDelete = this.getRecipeById(id);
		if (recipeToDelete) {
			const ind = this.recipes.indexOf(recipeToDelete);
			this.recipes.splice(ind, 1);
			this.recipesChanged.next([...this.recipes]);
		}
	}
}