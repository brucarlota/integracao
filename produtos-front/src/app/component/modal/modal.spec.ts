import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { of } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { Modal } from './modal';

registerLocaleData(localePtBr, 'pt-BR');

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;
  const produto: Produto = { id: 1, nome: 'bolsa termica', preco: 70 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
      providers: [
        {
          provide: ProdutosService,
          useValue: { atualizarProduto: () => of(undefined) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    fixture.componentRef.setInput('produto', produto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows details before actions and only shows fields in edit mode', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('input')).toBeNull();
    expect(element.textContent).toContain('Bolsa termica');
    expect(element.textContent).toContain('Editar ou remover produto');
    expect(element.textContent).not.toContain('Salvar alteracoes');

    const revealActionsButton = Array.from(element.querySelectorAll('button'))
      .find(button => button.textContent?.includes('Editar ou remover produto'));
    revealActionsButton?.click();
    fixture.detectChanges();

    const editButton = Array.from(element.querySelectorAll('button'))
      .find(button => button.textContent?.trim() === 'Editar');
    editButton?.click();
    fixture.detectChanges();

    expect(element.querySelectorAll('input')).toHaveLength(2);
    expect(element.textContent).toContain('Salvar alteracoes');
  });
});
