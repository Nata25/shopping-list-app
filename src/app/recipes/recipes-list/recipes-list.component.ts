import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  constructor() { }

  recipes: Recipe[] = [
    new Recipe('Mediterranian Chopped salad',
    'The great thing about chopped salads is that you can pretty much chop whatever vegetables you want and throw them all together. Since this is a Mediterranean chopped salad, I’m leaning more towards ingredients typical in Mediterranean recipes.',
    'https://feelgoodfoodie.net/wp-content/uploads/2019/02/Mediterranean-Chopped-Salad-7.jpg'),
    new Recipe('Lemon Salad',
    'This salad gets tossed in a zingy lemon dressing that doesn’t play by the rules. While most vinaigrettes stick to a three-to-one ratio of oil to acid, this recipe ups the acid and uses 1/3 cup lemon juice to only 1/4 cup olive oil. This makes the dressing super bright and tart, helping cut through the sweetness of the summer corn and tomatoes and balance everything out.',
    'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_1460,h_1825/k%2FPhoto%2FSeries%2F2021-08-make-ahead-salads%2FMake-Ahead-Salad_Chopped-veggie%2F2021-07-28_ATK-3856')
  ];

  @Output() onRecipeSelected = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.onRecipeSelected.emit(this.recipes[0]);
  }
}
