import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle/toggle.component';

const PAGES_COMPONENTS = [
  ToggleComponent,
];

@NgModule({
  declarations: [
    PAGES_COMPONENTS,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PAGES_COMPONENTS,
  ],
})
export class ComponentsModule { }
