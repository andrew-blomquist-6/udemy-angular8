import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSub: Subscription;
  isLoggedIn: boolean;

  constructor(private recipeService: RecipeService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.recipeService.fetchRecipes();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  saveData() {
    this.recipeService.storeRecipes();
  }

  fetchData() {
    this.recipeService.fetchRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
