import { Component, signal } from '@angular/core';
import { ListaProdutos } from './component/lista-produtos/lista-produtos';
import { AddProduto } from './component/add-produto/add-produto';

@Component({
  imports: [ListaProdutos, AddProduto],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('produtos-front');
}
