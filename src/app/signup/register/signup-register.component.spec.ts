/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRegisterComponent } from './signup-register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/auth.service';
import { MockAuthService } from '../../../testing/auth.service.mock';
import { SharedModule } from '../../shared/shared.module';
import { SignupService } from '../signup.service';
import { MockSignupService } from '../../../testing/signup.service.mock';

describe('SignupRegisterComponent', () => {
  let component: SignupRegisterComponent;
  let fixture: ComponentFixture<SignupRegisterComponent>;

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
        SignupRegisterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
