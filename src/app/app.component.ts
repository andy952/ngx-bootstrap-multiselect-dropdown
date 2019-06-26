import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <form #form="ngForm" (submit)="onSubmit()" >
    <div class="form-group row">
        <div class="col-6">
            <label>Test 1</label>
            <ngx-bootstrap-multiselect name="selectedItems" [(ngModel)]="selectedItems" [items]="dropdownList" [settings]="dropdownSettings"></ngx-bootstrap-multiselect>
        </div>
        <div class="col-6">
            <label>Test 2</label>
            <ngx-bootstrap-multiselect name="selectedItems2" [(ngModel)]="selectedItems2" [items]="dropdownList2" [settings]="dropdownSettings2"></ngx-bootstrap-multiselect>
        </div>
    </div>
    
    <button type="button" class="btn btn-danger" (click)="reset()">Reset</button>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  `,
  styles: []
})
export class AppComponent {
  title = 'simple-bootstrap-multiselect-dropdown';
  @ViewChild('form', {static: false}) public form: NgForm; 

  dropdownList = [];
  dropdownList2 = [];
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  

  onSubmit() {
    console.log(this.selectedItems, this.selectedItems2);
  }

  reset() {
    this.selectedItems = this.selectedItems.slice();
    this.selectedItems2 = this.selectedItems2.slice();
  }

  ngOnInit(){
    this.dropdownList = [
      {"idValue":1,"nameValue":"India"},
      {"idValue":2,"nameValue":"Singapore"},
      {"idValue":3,"nameValue":"Australia"},
      {"idValue":4,"nameValue":"Canada"},
      {"idValue":5,"nameValue":"South Korea"},
      {"idValue":6,"nameValue":"Germany"},
      {"idValue":7,"nameValue":"France"},
      {"idValue":8,"nameValue":"Russia"},
      {"idValue":9,"nameValue":"Italy"},
      {"idValue":10,"nameValue":null}
    ];
    this.dropdownList2 = [
      {"id":1,"name":"India"},
      {"id":2,"name":"Singapore"},
      {"id":3,"name":"Australia"}
    ];
    this.selectedItems = [];
    this.selectedItems2 = [
      {"id":1,"name":"India"},
      {"id":2,"name":"Singapore"},
      {"id":3,"name":"Australia"}
    ];
    this.dropdownSettings = {
      dataIdProperty: "idValue",
      dataNameProperty: "nameValue",
      headerText: "Test header",
      noneSelectedBtnText: "All selected",
      btnWidth: "200px",
      dropdownHeight: "200px",
      showDeselectAllBtn: true,
      showSelectAllBtn: true,
      deselectAllBtnText: 'Deselect',
      selectAllBtnText: 'Select',
      btnClasses: 'btn btn-primary btn-sm dropdown-toggle',
      selectionLimit: 3,
      enableFilter: true
    };
  }
}
