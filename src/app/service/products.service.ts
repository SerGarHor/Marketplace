import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) {}
  
  
  getProductsPlatzi(){
    return this.http.get('http://api.escuelajs.co/api/v1/products')

  }

  getProductsFake(){
    return this.http.get('https://fakestoreapi.com/products')

  }

}
