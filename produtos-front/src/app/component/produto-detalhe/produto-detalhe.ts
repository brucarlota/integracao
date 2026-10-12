import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Component({
	imports: [CommonModule],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe {
	produto = input<Produto | null>(null);
}
