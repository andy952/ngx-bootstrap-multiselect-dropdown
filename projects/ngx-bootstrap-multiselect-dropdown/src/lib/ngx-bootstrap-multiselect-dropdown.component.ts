import { Component, OnInit, forwardRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownSettings } from './dropdown-settings';
export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxBootstrapMultiselectDropdownComponent),
  multi: true
};
@Component({
  selector: 'ngx-bootstrap-multiselect',
  template: `
  <div class="dropdown" (click)="handleComponentClick($event)" >
    <button style="text-align: right"
      [disabled]="disabled"
      type="button" 
      (click)="showDropdown()"
      [ngClass]="innerSettings.btnClasses"
      [style.width]="innerSettings.btnWidth">
      <span style="float: left">{{selectedText}}</span>
      
    </button>
    <div *ngIf="isVisible" class="dropdown-menu pointer" [ngClass]="innerSettings.dropdownClasses" aria-labelledby="triggerId" style="display: inline-block">
      <div class="dropdown-header" *ngIf="innerSettings.headerText">{{innerSettings.headerText}}</div>
      <div *ngIf="innerSettings.showSelectAllBtn && !innerSettings.selectionLimit" class="dropdown-item" (click)="onSelectAll()">{{innerSettings.selectAllBtnText}}</div>
      <div *ngIf="innerSettings.showDeselectAllBtn" class="dropdown-item" (click)="onDeselectAll()">{{innerSettings.deselectAllBtnText}}</div>
      <div *ngIf="innerSettings.enableFilter" class="p-2"><input autocomplete="off" list="autocompleteOff" type="text" placeholder="Filter values" [value]="filterValue" (keyup)="onFilterSearch($event?.target?.value)" class="form-control form-control-sm" /></div>
      <div class="dropdown-divider" *ngIf="innerSettings.showSelectAllBtn || innerSettings.showDeselectAllBtn || innerSettings.enableFilter"></div>
      <div [style.height]="innerSettings.dropdownHeight" style="overflow: auto" >
        <div *ngFor="let item of filteredItems; let i=index" (click)="onSelect(item)" class="dropdown-item" [ngClass]="{'active': isActive(item), 'disabled': disabled }">
          {{item[innerSettings.dataNameProperty]}}            
        </div>    
      </div>  
    </div>
  </div>
  `,
  styles: ['.dropdown-item { cursor: pointer; }'],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class NgxBootstrapMultiselectDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() public disabled: boolean;
  @Input() public items: any[] = [];
  @Input() public settings: any;
  @Output() onDataSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDataOperationSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAllData = new EventEmitter();
  @Output() onDeselectAllData = new EventEmitter();
  public innerSettings: DropdownSettings;
  public selectedText: string;
  public filteredItems: any[] = [];
  public filterValue: string = '';
  public isVisible = false;
  public selectedItems: any[] = []; // Used to keep track if items currently selected. Dropdown item ids are stored

  // Close dropdown when clicking outside component
  @HostListener('document:click') clickOutsideComponent() {
    if(this.isVisible) this.isVisible = false;
  }

  // Prevent event reaching clickOutsideComponent 
  handleComponentClick(event: Event) {
    event.stopPropagation(); 
  }

  // Return selected items by filtering items array based on values in selectedItems array
  getSelectedItems() { 
    this.setSelectedText();
    return this.items
      .filter(_ => this.selectedItems.findIndex(x => x === _[this.innerSettings.dataIdProperty]) > -1) // Return only items with id values in selectedItems
      .slice();
  }

  // Set text when selecting item from dropdown
  setSelectedText() {
    this.selectedText = this.selectedItems.length 
      ? `${this.selectedItems.length} item${this.selectedItems.length > 1 ? 's' : ''} selected` 
      : this.innerSettings.noneSelectedBtnText;
  }

  // Toggle dropdown visibility
  showDropdown() {
    this.isVisible = this.isVisible ? false : true;
  }

  // Filter items based on item name property value
  onFilterSearch(value: string) {
    let searchValue = value;
    if(!this.innerSettings.caseSensitiveFilter) {
      searchValue = value.toLowerCase();
    } 

    this.filterValue = value; // Save filter value so it appears when toggling dropdown
    this.filteredItems = this.items.filter(_ => _[this.innerSettings.dataNameProperty] && 
      (this.innerSettings.caseSensitiveFilter ? _[this.innerSettings.dataNameProperty] : 
        _[this.innerSettings.dataNameProperty].toLowerCase()).startsWith(searchValue));
  }

  // Set selected dropdown item as active. Activated on dropdown item click
  onSelect(selectedObject: any) {
    if(this.disabled) return;

    this.onTouched();
    this.writeValue(selectedObject);    
    this.onDataSelect.emit(selectedObject);
  }

  // Set all dropdown items as active. Activated on select all button item click
  onSelectAll() {
    if(this.disabled) return;

    this.onTouched();
    this.selectedItems = this.items.map(_ => _[this.innerSettings.dataIdProperty]);
    this.writeValue(this.selectedItems);    
    this.onSelectAllData.emit();
  }

  // Remove active from all dropdown items. Activated on deselect all button item click
  onDeselectAll() {
    if(this.disabled) return;

    this.onTouched();
    this.selectedItems = [];
    this.writeValue([]);    
    this.onDeselectAllData.emit();
  }

  // Check if number of selected items is equal or greater than limit
  isSelectionLimitReached() {
    return this.innerSettings.selectionLimit && this.innerSettings.selectionLimit <= this.selectedItems.length;
  }

  // Check if dropdown item is active
  isActive(item: any) {
    return this.selectedItems.findIndex(x => x === item[this.innerSettings.dataIdProperty]) > -1;
  }
  
  // Check if input values exist in selectedItems array. If item exists remove from array, else add
  writeValue(selectedObject: any) {   
    if(selectedObject) {   
      const tempArray = Array.isArray(selectedObject) ? selectedObject as any[] : [selectedObject];
      const beforeLength = this.selectedItems.length;
      if(tempArray.length === 0) {
        this.selectedItems = [];
      }
      else {
        this.items = this.items.map(_ => {
          var index = tempArray.findIndex(x => _[this.innerSettings.dataIdProperty] === x[this.innerSettings.dataIdProperty]);
          if(index > -1) { 
            const index = this.selectedItems.findIndex(x => x === _[this.innerSettings.dataIdProperty]);
            if(index > -1) { 
              this.selectedItems.splice(index, 1); 
            } else {
              if(!this.isSelectionLimitReached()) {
                this.selectedItems.push(_[this.innerSettings.dataIdProperty]); 
              }  
            }
          }
  
          return _;
        }).slice();     
      }  
      const afterLength = this.selectedItems.length;
      if (afterLength > beforeLength) {
        this.onDataOperationSelect.emit({ operation: "added", item: selectedObject, selectedCount: this.selectedItems.length });
      } else if (afterLength < beforeLength) {
        this.onDataOperationSelect.emit({ operation: "removed", item: selectedObject, selectedCount: this.selectedItems.length });
      }
    }
    this.onChange(this.getSelectedItems());
  }

  ngOnInit() { 
    this.innerSettings = new DropdownSettings(this.settings); // Set initial setting values
    this.filteredItems = this.items; // Set initial filtered values
    this.setSelectedText(); // Set initial button text
  }

  // ControlValueAccessor methods
  onChange = (selectedObject: any[]) => {};
  onTouched = () => {};
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  } 
}

