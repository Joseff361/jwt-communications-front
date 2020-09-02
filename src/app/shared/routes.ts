import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ListaComponent } from '../components/lista/lista.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'lista', component: ListaComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' }
]