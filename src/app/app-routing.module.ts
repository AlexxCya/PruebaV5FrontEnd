import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { AuthGuard} from './security/auth.guard';
import { LoginComponent } from './login/login.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'country', component: CountryListComponent, canActivate:[AuthGuard]},
  { path: 'province/:id', component: ProvinceListComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
