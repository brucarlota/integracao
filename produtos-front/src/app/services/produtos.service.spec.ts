import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Produto } from '../models/produto.model';
import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProdutosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns products from the API envelope', () => {
    const expectedProducts: Produto[] = [{ id: 1, nome: 'bolsa termica', preco: 70 }];
    let actualProducts: Produto[] = [];

    service.listarProdutos().subscribe(products => actualProducts = products);
    httpTestingController.expectOne('http://localhost:5200/api/Produtos').flush({
      sucesso: true,
      dados: expectedProducts,
    });

    expect(actualProducts).toEqual(expectedProducts);
  });

});
