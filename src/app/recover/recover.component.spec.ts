/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverComponent } from './recover.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/auth.service';
import { MockAuthService } from '../../testing/auth.service.mock';
import { SharedModule } from '../shared/shared.module';
import { RecoverService } from './recover.service';
import { MockRecoverService } from '../../testing/recover.service.mock';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;

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
        RecoverComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
