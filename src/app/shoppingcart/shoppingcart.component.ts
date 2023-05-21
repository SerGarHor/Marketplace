import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  dataNavigate: any = ''
  data: any = ''
  Alldata: any = []
  valueTotal: number = 0
  productTotal: number = 0
  isLoadData = false
  constructor(
    private router: Router,
    public service: ProductsService
    ) { 
     this.data = this.router.getCurrentNavigation()?.extras.state
     if(this.data == undefined){
      this.isLoadData = false
     } else{
       this.dataNavigate = this.data.data
     }
  }
  ngOnInit(): void {
    this.loadData()
  }


  loadData(){
    if(this.dataNavigate.length == 0 ){
      this.isLoadData = false
    } else {
      this.isLoadData = true
      this.valueTotal = this.service.sumData(this.dataNavigate)
      this.productTotal = this.cantData()
    }
  }
  
  changeImg(data: any){
    return  data.images != undefined ? data.images[0] : data.image;
  }

  cantData(){
    let sum = 0
    this.dataNavigate.forEach((data: any) => {
      sum += data.cant
    })
    return  sum
  }

  delete(product: any){
    if(product.cant != 1){
      product.cant = product.cant - 1
    } else {
      const dataProduct: any = this.dataNavigate.findIndex((data: any)=> data.id == product.id)
      this.dataNavigate.splice(dataProduct, 1);
      this.loadData()
    }
  }

  downloadCSV(): void {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += Object.keys(this.dataNavigate[0]).join(',') + '\n';
    
    this.dataNavigate.forEach((item: any) => {
      csvContent += Object.values(item).join(',') + '\n';
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
  }
  
  downloadXLSX(): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.dataNavigate);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveData(excelBuffer, 'data.xlsx');
  }
  
  downloadXLS(): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.dataNavigate);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'array' });
    this.saveData(excelBuffer, 'data.xls');
  }
  
  saveData(buffer: any, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exit(){
    let data: any = this.dataNavigate != '' && this.dataNavigate != undefined ? { state: { data: this.dataNavigate } } : ''
    this.router.navigate(['/home'], data);
  }
}
