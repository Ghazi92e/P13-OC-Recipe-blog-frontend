import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTchatComponent } from './user-tchat.component';

describe('UserTchatComponent', () => {
  let component: UserTchatComponent;
  let fixture: ComponentFixture<UserTchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
