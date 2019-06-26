# NgxBootstrapMultiselectDropdown

<h4>Install</h4>
<p>
    npm install ngx-bootstrap-multiselect-dropdown
</p>

<h4>Example</h4>
<p>
    Add "node_modules/bootstrap/dist/css/bootstrap.min.css" to angular.json styles. 
</p>

```
//Import and register module
import { NgxBootstrapMultiselectDropdownModule } from 'ngx-bootstrap-multiselect-dropdown';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxBootstrapMultiselectDropdownModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }


//Example dropdown items
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

//model
this.selectedItems = [];


//Example settings
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


//Html
<ngx-bootstrap-multiselect
    name="selectedItems" 
    [(ngModel)]="selectedItems" 
    [items]="dropdownList" 
    [settings]="dropdownSettings">
</ngx-bootstrap-multiselect>
```


<h4>Settings</h4>
<table class="table">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>dropdownHeight</th>
            <td>string</td>
            <td>'auto'</td>
            <td>Sets the height of the dropdown.</td>
        </tr>
        <tr>
            <th>btnWidth</th>
            <td>string</td>
            <td>'auto'</td>
            <td>Width of the dropdown toggle button.</td>
        </tr>
        <tr>
            <th>noneSelectedBtnText</th>
            <td>string</td>
            <td>'None selected'</td>
            <td>Button text when no dropdown items are selected</td>
        </tr>
        <tr>
            <th>dataIdProperty</th>
            <td>string</td>
            <td>'id'</td>
            <td>Name of 'ID' property belonging to dropdown items.</td>
        </tr>
        <tr>
            <th>dataNameProperty</th>
            <td>string</td>
            <td>'name'</td>
            <td>Name of 'Name' property belonging to dropdown items.</td>
        </tr>
        <tr>
            <th>deselectAllBtnText</th>
            <td>string</td>
            <td>'Deselect all'</td>
            <td>Text of deselect all button.</td>
        </tr>
        <tr>
            <th>selectAllBtnText</th>
            <td>string</td>
            <td>'Select all'</td>
            <td>Text of select all button.</td>
        </tr>
        <tr>
            <th>enableFilter</th>
            <td>boolean</td>
            <td>false</td>
            <td>Show dropdown item filter text input.</td>
        </tr>
        <tr>
            <th>dropdownClasses</th>
            <td>string</td>
            <td>-</td>
            <td>Additional CSS classes added to dropdown menu.</td>
        </tr>
        <tr>
            <th>headerText</th>
            <td>string</td>
            <td>-</td>
            <td>Text displayed at top of dropdown menu.</td>
        </tr>
        <tr>
            <th>selectionLimit</th>
            <td>number</td>
            <td>-</td>
            <td>Limit number of how many dropdown items can be selected.</td>
        </tr>
        <tr>
            <th>showDeselectAllBtn</th>
            <td>boolean</td>
            <td>-</td>
            <td>Show deselect all button on dropdown menu.</td>
        </tr>
        <tr>
            <th>showSelectAllBtn</th>
            <td>boolean</td>
            <td>-</td>
            <td>Show select all button on dropdown menu.</td>
        </tr>
        <tr>
            <th>btnClasses</th>
            <td>string</td>
            <td>-</td>
            <td>Additional CSS classes added to dropdown menu toggle button.</td>
        </tr>
    </tbody>
</table>