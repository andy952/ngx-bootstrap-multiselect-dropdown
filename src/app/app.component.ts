import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'simple-bootstrap-multiselect-dropdown';
  model = new TestModel();
  @ViewChild('form', {static: false}) public form: NgForm; 

  dropdownList = [];
  dropdownList2 = [];
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  

  onSubmit() {
    console.log(this.form);
  }

  reset() {
    this.selectedItems = this.selectedItems.slice();
    this.selectedItems2 = this.selectedItems2.slice();
    this.model = new TestModel();
  }

  onSelectedOperation(data: any) {
    console.log(data);
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

    this.selectedItems = [];

    this.dropdownSettings = {
      dataIdProperty: "idValue",
      dataNameProperty: "nameValue",
      headerText: "Test header",
      noneSelectedBtnText: "All selected",
      btnWidth: "100%",
      dropdownHeight: "200px",
      showDeselectAllBtn: true,
      showSelectAllBtn: true,
      deselectAllBtnText: 'Deselect',
      selectAllBtnText: 'Select',
      btnClasses: 'btn btn-primary btn-sm dropdown-toggle',
      enableFilter: true
    };

    this.dropdownList2 = [
      {"id":1,"name":"India"},
      {"id":2,"name":"Singapore"},
      {"id":3,"name":"Australia"}
    ];
    
    this.selectedItems2 = [
      {"id":1,"name":"India"},
      {"id":2,"name":"Singapore"},
      {"id":3,"name":"Australia"}
    ];
    
  }
}

export class TestModel {
  data: any[] = [];
}
