import { Produtos } from './produtos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComprasService {

  private comprasUrl: string = 'http://localhost:3000/produtos';

  constructor(private httpClient: HttpClient){}

  retrieveAll() : Observable<Produtos[]> {
    return this.httpClient.get<Produtos[]>(this.comprasUrl);
  }

  retrieveById(id: number): Observable<Produtos> {
    return this.httpClient.get<Produtos>(`${this.comprasUrl}/${id}`);
  }

  save(produtos: Produtos): Observable<Produtos> {
    if(produtos.id){
      return this.httpClient.put<Produtos>(`${this.comprasUrl}/${produtos.id}`,produtos);
    } else{
      return this.httpClient.post<Produtos>(`${this.comprasUrl}`,produtos);
    }
  }

  deleteById(id: number): Observable<any> { //any indica que pode ser qualquer tipo
    return this.httpClient.delete<any>(`${this.comprasUrl}/${id}`);
  }
}
