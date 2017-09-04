import { Routes } from "@angular/router";
import { AuthorizationComponent } from "./components/authorization/authorization.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { AboutAuthorComponent } from "./components/about-author/about-author.component";
import { SigninComponent } from "./components/authorization/signin/signin.component";
import { SignupComponent } from "./components/authorization/signup/signup.component";
import { AuthGuard } from "./auth-guard.service";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "authorization/signin",
        pathMatch: "full"
    },
    {
        path: "authorization",
        component: AuthorizationComponent,
        children: [
            {
                path: "signin",
                component: SigninComponent
            },
            {
                path: "signup",
                component: SignupComponent
            }
            ]
    },
    {
        path: "main-page",
        component: MainPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "about-author",
        component: AboutAuthorComponent
    }
];
