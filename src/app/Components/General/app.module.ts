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
import { EditAntiqueComponent } from '../EditAntiqueComponent/editAntique.component';
import { ViewAntiqueComponent } from '../ViewAntiqueComponent/viewAntique.component';

// Services
import { DataService } from '../../Services/data.service';
import { FilterPipe } from '../../Pipes/data-filter.pipe';
import { FilterCategoryPipe } from '../../Pipes/category-filter.pipe';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from './../../../environments/environment.prod';

// Extras
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FilterPipe,
    FilterCategoryPipe,
    NewAntiqueComponent,
    EditAntiqueComponent,
    ViewAntiqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgxPaginationModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
