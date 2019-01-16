import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavComponent } from './nav.component';
import { of } from 'rxjs';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  beforeEach(() => {
    const breakpointObserverStub = {
      observe: (_: any) => of([true])
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverStub }
      ]
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
