import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShareUiService } from 'src/app/services/share_ui.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private shareUi: ShareUiService,
              private auth: AuthenticationService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])),
    });
  }

  ngOnInit() {
  }

  forgotPasswordTapped() {
    this.shareUi.ShowLoader();
    this.auth.forgotPassword(this.loginForm.value.email).subscribe(data => {
      console.log(data);
      if (data.status === false) {
        this.shareUi.loading.dismiss();
        this.shareUi.ShowErrorAlert(data.message, data.errors.email);
        this.loginForm.reset();
      } else {
        setTimeout(() => {
          this.shareUi.loading.dismiss();
          this.router.navigate(['public', 'reset-password']);
        }, 2000);
      }
    }, err => {
      setTimeout(() => {
        this.shareUi.loading.dismiss();
        if (err) {
          this.shareUi.ShowErrorAlert('There was an error', err.message);
          this.loginForm.reset();
        }
      }, 2000);
    });
  }
}
