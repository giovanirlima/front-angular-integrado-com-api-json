import { Product } from './../../../Interface/Product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  name?: string;
  price?: number;

  product: Product = {
    name: this.name!,
    price: this.price!
  };

  constructor(private productService: ProductService,
              private router: Router,
              private headerService: HeaderService) {
    this.headerService.headerData = {
      title: "Adicionar Novo Produto",
      icon: "storefront",
      routeUrl: "/products/create"
    }
  }

    ngOnInit(): void {

    }

    createProduct(): void {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
        this.productService.showMessage("Produto Adicionado!");
      })


    }

    cancelOperation(): void {
      this.productService.showMessage("Operação cancelada!");
      this.router.navigate(['/products']);
    }

  }
