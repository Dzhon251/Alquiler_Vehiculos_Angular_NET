import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAlquilerComponent } from './nuevo-alquiler.component';

describe('NuevoAlquilerComponent', () => {
  let component: NuevoAlquilerComponent;
  let fixture: ComponentFixture<NuevoAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAlquilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
