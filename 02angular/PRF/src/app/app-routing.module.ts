import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FirstComponent } from './first/first.component';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'first', component: FirstComponent, canActivate: [AuthGuard]},
  {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'second/:id', component: SecondComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }