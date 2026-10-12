import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs/internal/Observable';

// @Service()
@Injectable({ providedIn: 'root' })
export class ProdutosService {
	private apiUrl = 'http://localhost:5200/api/Produtos';

	constructor(private http: HttpClient) { }

	listarProdutos(): Observable<Produto[]> {
	return this.http.get<Produto[]>(this.apiUrl);
	}

	buscarProdutoPorId(id: number): Observable<Produto> {
	const url = `${this.apiUrl}/${id}`;
	return this.http.get<Produto>(url);
	}

	criarProduto(produto: Produto): Observable<Produto> {
	return this.http.post<Produto>(this.apiUrl, produto);
	}

	atualizarProduto(id: number, produto: Produto): Observable<void> {
	const url = `${this.apiUrl}/${id}`;
	return this.http.put<void>(url, produto);
	}

	excluirProduto(id: number): Observable<void> {
	const url = `${this.apiUrl}/${id}`;
	return this.http.delete<void>(url);
	}
}
