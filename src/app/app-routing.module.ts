import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'chose-login', pathMatch: 'full' },
  { path: 'chose-login', loadChildren: './public/chose-login/chose-login.module#ChoseLoginPageModule' },
  {path : 'public',
   loadChildren: './public/public-routing.module#PublicRoutingModule'},
  {path: 'members',
   canActivate: [AuthGuard],
   loadChildren: './members/member-routing.module#MemberRoutingModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
