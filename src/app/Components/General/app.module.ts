import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';

// import keys from '../../DataModels/FrontEndKeys';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from '../HeaderComponent/header.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { HomeComponent } from '../HomeComponent/home.component';
import { NewAntiqueComponent } from '../NewAntiqueComponent/newAntique.component';

// Services
import { DataService } from '../../Services/data.service';

// Extras



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewAntiqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
