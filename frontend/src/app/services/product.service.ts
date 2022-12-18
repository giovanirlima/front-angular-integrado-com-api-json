import { map } from 'rxjs/operators';
import { Product } from './../Interface/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-failed'] : ['msg-sucess']
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiBaseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Falha da solicitação!", true);
    return EMPTY;
  }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiBaseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiBaseUrl}/${product.id}`, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  remove(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.apiBaseUrl}/${product.id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
