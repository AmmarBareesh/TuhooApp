import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShareUiService } from 'src/app/services/share_ui.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private shareUi: ShareUiService,
              private auth: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    },
    {
      validators: this.password.bind(this)
    }
    );
  }
  ngOnInit() {
  }

  resetPasswordTapped() {
    this.shareUi.ShowLoader();
    this.auth.forgotPassword(this.loginForm.value.userName).subscribe(data => {
      setTimeout(() => {
        this.shareUi.loading.dismiss();
        // this.router.navigate(['/home']);
      }, 2000);
    }, err => {
      setTimeout(() => {
        this.shareUi.loading.dismiss();
        if (err) {
          this.shareUi.ShowErrorAlert('الأيميل غير موجود', err.error.email);
          this.loginForm.reset();
          // this.router.navigate(['/home']);
        }
      }, 2000);
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
