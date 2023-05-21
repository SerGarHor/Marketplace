import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';

let routes: Routes = []
  routes = [
    { path: '', redirectTo: 'https://sergarhor.github.io/Marketplace/home', pathMatch: 'full' },
    { path: 'https://sergarhor.github.io/Marketplace/home', component: HomeComponent },
    { path: 'https://sergarhor.github.io/Marketplace/home/shoppingcart', component: ShoppingcartComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
