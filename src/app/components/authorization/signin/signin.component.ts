import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {User} from "./user";
import {HttpService} from '../../../http.service';
import {AuthGuard} from '../../../auth-guard.service';
import {AuthService} from '../../../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css', '../../../../../node_modules/bootstrap/dist/css/bootstrap.css'],
    providers: [HttpService, AuthGuard]
})
export class SigninComponent implements OnInit {
    userForm: FormGroup;
    user: User = new User();
    wrongAuthorization: any;

    // Object wight errors
    formErrors = {
        "email": "",
        "password": ""
    };

    // Object wight messages of errors
    validationMessages = {
        "email": {
            "required": "Required field.",
            "pattern": "Wrong Email format."
        },
        "password": {
            "required": "Required field.",
            "minlength": "Min. length 6 characters."
        }
    };

    constructor(private fb: FormBuilder,
                private httpService: HttpService,
                private router: Router,
                private authservice: AuthService) {
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.userForm = this.fb.group({
            "email": [this.user.email, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9_]{2,}\.[a-zA-Z]{2,4}")
            ]],
            "password": [this.user.password, [
                Validators.required,
                Validators.minLength(6)
            ]]

        });

        this.userForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }

    onValueChange(data?: any) {
        if (!this.userForm) return;
        let form = this.userForm;
        for (let field in this.formErrors) {
            this.formErrors[field] = "";
            let control = form.get(field);
            if (control && control.dirty && !control.valid) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    }

    onSubmit() {
        this.httpService.getUser(this.userForm.value.email, this.userForm.value.password)
            .subscribe(
                user => {
                    if (typeof user == "string") {
                        if (user == 'Wrong Email' || user == 'Wrong Password') this.wrongAuthorization = user;
                    } else {
                        this.wrongAuthorization = "";
                        this.authservice.setIsLoggedIn(true).subscribe((bool) => {
                            /*console.log("subscribe" + bool)*/
                        });
                        this.router.navigate(['../../main-page']);
                    }
                }
            );
    }

}
