import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listinventory } from './listinventory';

describe('Listinventory', () => {
  let component: Listinventory;
  let fixture: ComponentFixture<Listinventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listinventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listinventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
