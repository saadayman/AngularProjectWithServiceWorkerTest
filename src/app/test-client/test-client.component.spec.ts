import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestClientComponent } from './test-client.component';

describe('TestClientComponent', () => {
  let component: TestClientComponent;
  let fixture: ComponentFixture<TestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
