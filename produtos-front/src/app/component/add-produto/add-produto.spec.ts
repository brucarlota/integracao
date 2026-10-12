import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProduto } from './add-produto';

describe('AddProduto', () => {
  let component: AddProduto;
  let fixture: ComponentFixture<AddProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
