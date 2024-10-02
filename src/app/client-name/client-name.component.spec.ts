import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNameComponent } from './client-name.component';

describe('ClientNameComponent', () => {
  let component: ClientNameComponent;
  let fixture: ComponentFixture<ClientNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
