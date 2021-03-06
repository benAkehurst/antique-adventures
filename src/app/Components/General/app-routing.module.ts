import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { HomeComponent } from '../HomeComponent/home.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { NewAntiqueComponent } from '../NewAntiqueComponent/newAntique.component';
import { EditAntiqueComponent } from '../EditAntiqueComponent/editAntique.component';
import { ViewAntiqueComponent } from '../ViewAntiqueComponent/viewAntique.component';


// App Common


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'newAntique', component: NewAntiqueComponent},
    { path: 'editAntique', component: EditAntiqueComponent},
    { path: 'viewAntique', component: ViewAntiqueComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
