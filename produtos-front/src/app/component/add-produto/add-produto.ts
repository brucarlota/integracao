import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  imports: [FormsModule],
  selector: 'app-add-produto',
  styleUrl: './add-produto.css',
  templateUrl: './add-produto.html',
})
export class AddProduto {
  novoProduto = signal<Produto>({
    id: 0,
    nome: '',
    preco: 0,
  });

  constructor(private produtosService: ProdutosService) {}

  criarProduto(): void {
    this.produtosService.criarProduto(this.novoProduto()).subscribe(() => {
      this.novoProduto.set({ id: 0, nome: '', preco: 0 });
    });
  }

  atualizarNome(nome: string): void {
    this.novoProduto.update(produto => ({ ...produto, nome }));
  }

  atualizarPreco(preco: number | null): void {
    this.novoProduto.update(produto => ({ ...produto, preco: preco ?? 0 }));
  }
}
