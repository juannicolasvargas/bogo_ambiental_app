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
  signInUser = { login: '', password: '' }

  constructor(private tokenService: AngularTokenService, private router: Router) { }

  onSignInSubmit() {
    this.tokenService.signIn(this.signInUser).subscribe(
      res => { this.router.navigateByUrl('/home'); },
      error => error
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
  }

  formForSignUp() {
    let signUpElements = document.querySelectorAll(".disabled-input");
    signUpElements.forEach(element => { element.classList.remove('disabled-input') });
    this.getWrapperElement().classList.add('signup-wrapper');
    this.getWrapperElement().classList.remove('signin-wrapper');
    this.getSubmitElement().innerHTML = 'Registrarse';
  }

  getWrapperElement() { return document.querySelector("#wrapper") }

  getSubmitElement() { return document.querySelector("#buttonSubmit") }

  showHidePassword() {
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
  
  //For test
  // eventClickSubmit() {
  //   if (this.tokenService.userSignedIn() == true) {
  //   console.log('logueado');
  //   this.tokenService.signOut().subscribe(
  //     res =>      console.log(res),
  //     error =>    console.log(error)
  //   );
  //   }
  // }

  ngOnInit() {
  }

}
