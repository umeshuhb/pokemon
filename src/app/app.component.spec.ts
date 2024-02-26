import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the header component', () => {
    expect(compiled.querySelector('app-header')).not.toBe(null);
  });

  it('should have the make-transfer component', () => {
    expect(compiled.querySelector('app-make-transfer')).not.toBe(null);
  });

  it('should have the transaction-list component', () => {
    expect(compiled.querySelector('app-transaction-list')).not.toBe(null);
  });

  it('should have the footer component', () => {
    expect(compiled.querySelector('app-footer')).not.toBe(null);
  });

});
