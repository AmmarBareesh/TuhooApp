import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShareUiService } from 'src/app/services/share_ui.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private shareUi: ShareUiService,
    private tokenService: TokenService,
    private auth: AuthenticationService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      userpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]))
    });
  }

  ngOnInit() {
  }

  loginTapped() {
    if (navigator.onLine) {
      this.shareUi.ShowLoader();
      this.auth.loginUser(this.loginForm.value.userName, this.loginForm.value.userpassword).subscribe(data => {
        this.auth.loginState();
        setTimeout(() => {
          this.shareUi.loading.dismiss();
        }, 1000);
        this.router.navigate(['/members/home']);
      }, err => {
        setTimeout(() => {
          this.shareUi.loading.dismiss();
          if (err) {
            this.shareUi.ShowErrorAlert('Login Error', err.error.message);
            this.loginForm.reset();
          } else {
            this.shareUi.ShowErrorAlert('Something went wrong', err.error.message);
            this.loginForm.reset();
          }
        }, 1000);
      });
    } else {
      this.shareUi.ShowErrorAlert('No internet conection', 'check if wifi is working');
    }
  }


}
