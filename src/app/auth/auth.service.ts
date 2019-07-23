import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  /*
  Normally, we'd use the angular http service to do authentication,
  but we're just going to allow anyone to 'sign in' if they give us a username we've stored in localStorage
   */
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  private localStorageKey = 'udemy-course-auth';
  private userList: string[];

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
    this.userList = JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  signup(username: string) {
    if (this.userList.indexOf(username) > -1) {
      return;
    }
    this.userList.push(username);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userList));
    this.isLoggedIn.next(true);
  }

  login(username: string) {
    if (this.userList.indexOf(username) > -1) {
      this.isLoggedIn.next(true);
    }
  }

  logout() {
    this.isLoggedIn.next(false);
  }
}
