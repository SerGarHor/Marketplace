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
    return this.http.get('https://api.escuelajs.co/api/v1/products')

  }

  getProductsFake(){
    return this.http.get('https://fakestoreapi.com/products')

  }

  sumData(data: any){
    let sum = 0
    data.forEach((value: any) => {
      sum += value.cant
    })
    return  sum
  }

}
