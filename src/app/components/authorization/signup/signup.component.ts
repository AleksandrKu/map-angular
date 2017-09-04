import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {User} from "./user";
import {HttpService} from '../../../http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css', '../../../../../node_modules/bootstrap/dist/css/bootstrap.css'],
    providers: [HttpService]
})
export class SignupComponent implements OnInit {
    userForm: FormGroup;
    user: User = new User();

    isConfirmPassword: boolean = false;
    isButtonSubmit: boolean = true;
    emailIsRegistred: any;
    successfulRegistered: string;

    formErrors = {
        "email": "",
        "password": ""
    };

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
                private router: Router) {
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
            ]],
            "confirm_password": [this.user.confirm_password, [
                Validators.required
            ]]
        });

        this.userForm.valueChanges
            .subscribe(data => this.onValueChange(data));
        this.onValueChange();
    }

    onValueChange(data?: any) {
        if (data) {
            if (data.confirm_password) {
                if (data.password === data.confirm_password) {
                    this.isConfirmPassword = false;
                } else {
                    this.isConfirmPassword = true;
                }

                if (!this.isConfirmPassword && this.userForm.valid) {
                    this.isButtonSubmit = false;
                } else {
                    this.isButtonSubmit = true;
                }
            }
        }

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
        this.httpService.addUser(this.userForm.value)
            .subscribe(
                res => {
                    if (typeof res == "string") {
                        this.emailIsRegistred = res;
                    } else {
                        this.emailIsRegistred = "";
                        this.successfulRegistered = "You have been successfully registered.  Automatic redirect to Sing In";
                        setTimeout(() => this.router.navigate(['../../authorization/signin']), 3000);
                    }
                }
            );
    }
}
