import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  imports: [CommonModule],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos implements OnInit {
	produtos = signal<Produto[]>([]);
	erroCarregamento = signal('');

	constructor(private produtosService: ProdutosService) { }

	ngOnInit(): void {
		this.carregarProdutos();
	}

	removerProduto(id: number): void {
		if (!window.confirm('Deseja remover este produto?')) {
		return;
		}

		this.produtosService.excluirProduto(id).subscribe(() => {
		this.produtos.update(produtos => produtos.filter(produto => produto.id !== id));
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

    editarProduto(id: number): void {
        this.produtosService.buscarProdutoPorId(id).subscribe({
            next: produto => {
                // Aqui você pode fazer algo com o produto retornado, como exibir em um formulário de edição
                console.log('Produto para edição:', produto);
            },
            error: () => {
                console.error('Erro ao buscar o produto para edição.');
            }
        });
    }
}
