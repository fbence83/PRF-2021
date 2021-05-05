import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyedProductsComponent } from './buyed-products.component';

describe('BuyedProductsComponent', () => {
  let component: BuyedProductsComponent;
  let fixture: ComponentFixture<BuyedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
