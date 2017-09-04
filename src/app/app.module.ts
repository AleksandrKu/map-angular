import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { routes } from "./app.routes";

import { AuthorizationComponent } from './components/authorization/authorization.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutAuthorComponent } from './components/about-author/about-author.component';

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SigninComponent } from './components/authorization/signin/signin.component';
import { SignupComponent } from './components/authorization/signup/signup.component';
import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    MainPageComponent,
    AboutAuthorComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
