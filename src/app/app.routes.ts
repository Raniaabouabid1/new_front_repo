import {RouterModule, Routes} from '@angular/router';
import {LogintestComponent} from './components/logintest/logintest.component';
import {AcceuilComponent} from './components/acceuil/acceuil.component';
import {NgModule} from '@angular/core';
import {SurveillanceFootageComponent} from './components/surveillance-footage/surveillance-footage.component';
import {ProfileCardComponent} from './components/profile-card/profile-card.component';

export const routes: Routes = [
  { path: 'login', component: LogintestComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'footages', component: SurveillanceFootageComponent },
  { path: 'profile', component: ProfileCardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
