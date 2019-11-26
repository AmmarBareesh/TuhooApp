import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginAsCorporatePage } from './login-as-corporate.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAsCorporatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginAsCorporatePage]
})
export class LoginAsCorporatePageModule {}
