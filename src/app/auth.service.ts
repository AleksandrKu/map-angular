import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/of";
import "rxjs/add/operator/do";

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    setIsLoggedIn(isLoggedIn : boolean) :Observable<boolean> {
        return Observable
            .of(true)
            .do( val => this.isLoggedIn = isLoggedIn)
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }

}