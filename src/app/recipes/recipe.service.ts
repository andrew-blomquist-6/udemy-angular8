import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private dataStorage: DataStorageService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  fetchRecipes() {
    this.recipes = this.dataStorage.fetchRecipes();
    this.recipesChanged.next(this.recipes.slice());
  }

  storeRecipes() {
    this.dataStorage.storeRecipes(this.recipes);
  }
}
