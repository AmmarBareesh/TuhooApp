import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TrendingComponent } from './trending/trending.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    ProfileComponent,
    TrendingComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ProfileComponent, TrendingComponent, CategoriesComponent]

})
export class SharedComponentsModule {}
