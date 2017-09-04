import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

import {AuthService} from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authservice: AuthService) {
    }

    canActivate() {
        if (this.authservice.getIsLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }
}
