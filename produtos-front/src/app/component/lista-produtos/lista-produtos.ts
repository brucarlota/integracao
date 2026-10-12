import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { Modal } from '../modal/modal';

@Component({
	imports: [CommonModule, Modal],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos implements OnInit {
	produtos = signal<Produto[]>([]);
	erroCarregamento = signal('');
	produtoSelecionado = signal<Produto | null>(null);

	constructor(private produtosService: ProdutosService) { }

	ngOnInit(): void {
		this.carregarProdutos();
	}

	removerProduto(id: number): void {
		if (!window.confirm('Deseja remover este produto?')) {
			return;
		}

		this.produtosService.excluirProduto(id).subscribe({
			next: () => {
				this.produtos.update(produtos => produtos.filter(produto => produto.id !== id));
				this.fecharModal();
			},
			error: () => this.erroCarregamento.set('Nao foi possivel remover o produto.'),
		});
	}

	private carregarProdutos(): void {
		this.produtosService.listarProdutos().subscribe({
		next: produtos => {
			this.produtos.set(produtos);
			this.erroCarregamento.set('');
		},
		error: () => {
			this.erroCarregamento.set('Nao foi possivel carregar os produtos. Verifique se a API esta em execucao.');
		},
		});
	}

	detalharProduto(id: number): void {
		const produto = this.produtos().find(item => item.id === id);
		this.produtoSelecionado.set(produto ?? null);
	}

	fecharModal(): void {
		this.produtoSelecionado.set(null);
	}

	produtoSalvo(produtoAtualizado: Produto): void {
		this.produtos.update(produtos =>
			produtos.map(produto => produto.id === produtoAtualizado.id ? produtoAtualizado : produto)
		);
		this.fecharModal();
	}
}
