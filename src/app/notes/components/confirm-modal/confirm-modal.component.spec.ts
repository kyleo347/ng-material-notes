import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material';
import { ConfirmModalComponent } from './confirm-modal.component';
describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatDialogModule],
      declarations: [ConfirmModalComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefStub }]
    });
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('cancel', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<{}> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close');
      component.cancel();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });
});
