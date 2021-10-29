import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  constructor() { }

  recipes: Recipe[] = [
    new Recipe('Shakshuka Recipe',
    'Shakshuka is an easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa. It’s a simple combination of simmering tomatoes, onions, garlic, spices and gently poached eggs. It’s nourishing, filling and one recipe I guarantee you’ll make time and again.',
    'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg')
  ];

  ngOnInit(): void {
  }

}
