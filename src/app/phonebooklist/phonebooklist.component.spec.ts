import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebooklistComponent } from './phonebooklist.component';

describe('PhonebooklistComponent', () => {
  let component: PhonebooklistComponent;
  let fixture: ComponentFixture<PhonebooklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonebooklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
