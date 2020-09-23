import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ListaComponent } from '../components/lista/lista.component';
import { AboutComponent } from '../components/about/about.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ServiceDetailComponent } from '../components/service-detail/service-detail.component';
import { RequestsComponent } from '../components/requests/requests.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'lista', component: ListaComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'service-detail/:id', component: ServiceDetailComponent },
    {path: 'requests', component: RequestsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' }
]