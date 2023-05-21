import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component'
import { environment } from 'environment.prod';

let routes: Routes = []
if(environment){
  routes= [
    { path: '', redirectTo: `${environment.appPath}/home`, pathMatch: 'full' },
    { path: `${environment.appPath}/home`, component: HomeComponent },
    { path: `${environment.appPath}/home/shoppingcart`, component: ShoppingcartComponent },
  ];
} else {
   routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'home/shoppingcart', component: ShoppingcartComponent },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }