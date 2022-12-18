import { Product } from './../../../Interface/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  updateProduct(): void {
    this.productService.update(this.product!).subscribe(() => {
      this.productService.showMessage("Produto Atualizado com sucesso!");
      this.router.navigate(['/products']);
    });
  }

  cancelOperation(): void {
    this.router.navigate(['/products'])
  }

}
