/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverConfirmComponent } from './recover-confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/auth.service';
import { MockAuthService } from '../../../testing/auth.service.mock';
import { SharedModule } from '../../shared/shared.module';
import { RecoverService } from '../recover.service';
import { MockRecoverService } from '../../../testing/recover.service.mock';

describe('RecoverConfirmComponent', () => {
  let component: RecoverConfirmComponent;
  let fixture: ComponentFixture<RecoverConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: RecoverService, useClass: MockRecoverService }
      ],
      declarations: [
        RecoverConfirmComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
