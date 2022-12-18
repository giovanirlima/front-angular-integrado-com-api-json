import { Product } from './../../../Interface/Product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product?: Product;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService) {
    this.headerService.headerData = {
      title: "Adicionar Novo Produto",
      icon: "storefront",
      routeUrl: "/products/create"
    }
  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getById(id!).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.remove(this.product!).subscribe(() => {
      this.productService.showMessage("Produto Deletado com Sucesso!");
      this.router.navigate(['/products'])
    });
  }

  cancelOperation(): void {
    this.productService.showMessage("Operação Cancelada!");
    this.router.navigate(['/products'])
  }

}
