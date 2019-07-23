import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';

/*
this service would talk with whatever server/database we store our data in.
But for now, we're just going to store everything in local storage.
 */

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private localStorageKey = 'udemy-course';

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  fetchRecipes(): Recipe[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  storeRecipes(recipes: Recipe[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
  }
}
