import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewinventory } from './viewinventory';

describe('Viewinventory', () => {
  let component: Viewinventory;
  let fixture: ComponentFixture<Viewinventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewinventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewinventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
