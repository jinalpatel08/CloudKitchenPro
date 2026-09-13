import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addinventory } from './addinventory';

describe('Addinventory', () => {
  let component: Addinventory;
  let fixture: ComponentFixture<Addinventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addinventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addinventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
