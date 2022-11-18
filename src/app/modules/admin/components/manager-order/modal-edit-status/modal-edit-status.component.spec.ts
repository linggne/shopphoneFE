import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditStatusComponent } from './modal-edit-status.component';

describe('ModalEditStatusComponent', () => {
  let component: ModalEditStatusComponent;
  let fixture: ComponentFixture<ModalEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
