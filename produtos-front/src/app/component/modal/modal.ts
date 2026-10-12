import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-modal',
  styleUrl: './modal.css',
  templateUrl: './modal.html',
})
export class Modal implements OnInit {
  produto = input.required<Produto>();
  fechado = output<void>();
  salvo = output<Produto>();
  removido = output<number>();
  erro = signal('');
  mostrarAcoes = signal(false);
  modoEdicao = signal(false);
  produtoEditado!: Produto;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtoEditado = { ...this.produto() };
  }

  fechar(): void {
    this.fechado.emit();
  }

  exibirAcoes(): void {
    this.mostrarAcoes.set(true);
  }

  editar(): void {
    this.produtoEditado = { ...this.produto() };
    this.modoEdicao.set(true);
  }

  cancelarEdicao(): void {
    this.produtoEditado = { ...this.produto() };
    this.modoEdicao.set(false);
  }

  remover(): void {
    this.removido.emit(this.produto().id);
  }

  salvar(): void {
    this.erro.set('');
    const produto = { ...this.produtoEditado };

    this.produtosService.atualizarProduto(produto.id, produto).subscribe({
      next: () => this.salvo.emit(produto),
      error: () => this.erro.set('Nao foi possivel salvar as alteracoes.'),
    });
  }
}
