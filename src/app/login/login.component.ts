import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularTokenService } from "angular-token";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  passwordIcon: string = 'eye';
  passwordType: string = 'password';
  public signInUser;
  public signUpUser;

  constructor(private tokenService: AngularTokenService, private router: Router) {
    this.signInUser = { login: '', password: '' };
    this.signUpUser = { passwordConfirmation: '', name: '', last_name: '' };
  }

  onSubmitBtn() {
    if (this.getSubmitElement().getAttribute("credentials") === "signIn") {
      this.onSignIn();
    }
    else {
      this.onSignUp();
    }
  }

  onSignIn() {
    this.tokenService.signIn(this.signInUser).subscribe(
      res => {
        localStorage.setItem("user", JSON.stringify(res.body.data));
        this.router.navigateByUrl('/dashboard');
      },
      error => error
    );
  }

  onSignUp() {
    this.signUpUser.passwordConfirmation = this.signInUser.password;
    const payload = Object.assign(this.signInUser, this.signUpUser);
    this.tokenService.registerAccount(payload).subscribe(
      res => {
        localStorage.setItem("user", JSON.stringify(res.body.data));
        this.router.navigateByUrl('/dashboard');
      },
      error => console.log(error)
    );
  }

  segmentAuthChanged(ev: any) {
    ev.detail.value == 'signin' ? this.formForLogin() : this.formForSignUp();
  }

   formForLogin() {
     let signInElements = document.querySelectorAll(`input[for-signup]`);
     this.getWrapperElement().classList.add('signin-wrapper');
     this.getWrapperElement().classList.remove('signup-wrapper');
     signInElements.forEach(element => { element.classList.add('disabled-input') });
     this.getSubmitElement().innerHTML = 'Iniciar';
     this.getSubmitElement().setAttribute("credentials", "signIn");
  }

  formForSignUp() {
    let signUpElements = document.querySelectorAll(".disabled-input");
    signUpElements.forEach(element => { element.classList.remove('disabled-input') });
    this.getWrapperElement().classList.add('signup-wrapper');
    this.getWrapperElement().classList.remove('signin-wrapper');
    this.getSubmitElement().innerHTML = 'Registrarse';
    this.getSubmitElement().setAttribute("credentials", "signUp");
  }

  getWrapperElement() { return document.querySelector("#wrapper") }

  getSubmitElement() { return document.querySelector("#buttonSubmit") }

  showHidePassword() {
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  ngOnInit() {
  }

}
