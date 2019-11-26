import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShareUiService } from 'src/app/services/share_ui.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loginForm: FormGroup;
  showPass = false;
  btnLogshow = false;
  customPickerOptions: any;
  birthDate: any;
  image = 'assets/images/signIn/profileAdd.svg';
  isTakeImage = false;
  ImageToSend: any;
  imageBlob: any;


  constructor(private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private shareUi: ShareUiService,
              private tokenService: TokenService,
              private router: Router,
              private datePipe: DatePipe,
              private camera: Camera,
              private sanitizer: DomSanitizer) {

    this.loginForm = this.formBuilder.group({
      userpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])),
      birthday: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  RegisterUser() {
    if (!this.isTakeImage) {
      this.shareUi.ShowErrorAlert('No image selected', ' You must upload profile picture');
    } else {
      this.birthDate = this.datePipe.transform(this.loginForm.value.birthday, 'yyyy-MM-dd');
      this.shareUi.ShowLoader();
      // tslint:disable-next-line:max-line-length
      this.auth.customerRegister(this.loginForm.value.userName, this.loginForm.value.email, this.loginForm.value.userpassword, this.birthDate, this.ImageToSend).subscribe(data => {
        this.auth.loginState();
        console.log(data);
        setTimeout(() => {
          this.shareUi.loading.dismiss();
        }, 2000);
        this.router.navigate(['/members/home']);
      }, err => {
        setTimeout(() => {
          this.shareUi.loading.dismiss();
          if (err) {
            this.shareUi.ShowErrorAlert('Error creating new account', err.message);
            this.loginForm.reset();
            this.router.navigate(['members', 'home']);
          } else {
            this.shareUi.ShowErrorAlert('Something went wrong', err.message);
            this.loginForm.reset();
          }
        }, 2000);
      });
    }
  }

  SelectImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    };
    this.camera.getPicture(options).then(img => {
      this.isTakeImage = true;
      this.ImageToSend = 'data:image/jpeg;base64,' + img;
      const date = new Date().valueOf();
      const imageName = date + '.jpeg';
      this.imageBlob = this.dataURItoBlob(img);
      const storedPhoto = new File([this.imageBlob], imageName, { type: 'image/jpeg' });
      console.log(storedPhoto);
    });
  }

  // async SelectImage() {
  //   const options: CameraOptions = {
  //     quality: 90,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: false,
  //     correctOrientation: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     targetWidth: 512,
  //     targetHeight: 512
  //   };

  //   this.camera.getPicture(options).then(img => {
  //     this.veiwImage = 'data:image/jpeg;base64,' + img;
  //     this.isTakeImage = true;
  //     const date = new Date().valueOf();
  //     const imageName = date + '.jpeg';
  //     this.imageBlob = this.dataURItoBlob(img);
  //     this.storedPhoto = new File([this.imageBlob], imageName, { type: 'image/jpeg' });
  //   });
  // }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  // getImgContent(image): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl(image);
  // }

}
