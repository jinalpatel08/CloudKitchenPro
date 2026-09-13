import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editinventory } from './editinventory';

describe('Editinventory', () => {
  let component: Editinventory;
  let fixture: ComponentFixture<Editinventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editinventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editinventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
