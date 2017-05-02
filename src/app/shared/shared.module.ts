import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule
  ]
})
export class SharedModule {
}
