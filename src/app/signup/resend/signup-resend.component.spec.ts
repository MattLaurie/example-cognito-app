/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupResendComponent } from './signup-resend.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/auth.service';
import { MockAuthService } from '../../../testing/auth.service.mock';
import { SharedModule } from '../../shared/shared.module';
import { SignupService } from '../signup.service';
import { MockSignupService } from '../../../testing/signup.service.mock';

describe('SignupResendComponent', () => {
  let component: SignupResendComponent;
  let fixture: ComponentFixture<SignupResendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: SignupService, useClass: MockSignupService }
      ],
      declarations: [
        SignupResendComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
