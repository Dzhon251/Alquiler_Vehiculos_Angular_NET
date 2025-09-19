import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVehiculoComponent } from './nuevo-vehiculo.component';

describe('NuevoVehiculoComponent', () => {
  let component: NuevoVehiculoComponent;
  let fixture: ComponentFixture<NuevoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
