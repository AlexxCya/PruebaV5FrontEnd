import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptor } from './security/jwt.interceptor';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';
import { ProvinceFormComponent } from './province/province-form/province-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogDeleteComponent,
    LoginComponent,
    CountryListComponent,
    CountryFormComponent,
    ProvinceListComponent,
    ProvinceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
