import { NgModule } from '@angular/core';
import { NgxBootstrapMultiselectDropdownComponent } from './ngx-bootstrap-multiselect-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxBootstrapMultiselectDropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NgxBootstrapMultiselectDropdownComponent]
})
export class NgxBootstrapMultiselectDropdownModule { }
