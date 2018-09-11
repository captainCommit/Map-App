import { Component, OnInit,EventEmitter,Input} from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {DataService} from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  routeLinks : any[];
  activeLinkIndex = -1;
  persons :any;
  query : string;
  name : string;
  con : string;
  year: string;
  filteredOptions: Observable<string[]>;
  constructor(private router : Router,private route: ActivatedRoute, private http: HttpClient,private data : DataService)
  {
    this.routeLinks = [
            {
                label: 'Gallery',
                path: '/gallery',
                index: 1
            }, {
                label: 'Distribution',
                path: '/filter',
                index: 2
            }, {
                label: 'Metadata',
                path: '/tag',
                index: 3
            }
          ]
  }
  title = 'map-app';
  location :any[]= [];
  pageForm = new FormGroup({
    name: new FormControl(''),
    con: new FormControl(''),
    year: new FormControl('')
  });
  onSubmit()
  {
      this.name = this.pageForm.value.name;
      this.con = this.pageForm.value.con;
      this.year = this.pageForm.value.year;
      if(this.name == "" && this.con == "" && this.year =="")
        this.query="?";
      else if(this.year == "" && this.name == "")
        this.query="?con="+this.con;
      else if(this.year == "" && this.con == "")
        this.query="?name="+this.name;
      else if(this.name == "" && this.con == "")
        this.query="?year="+this.year;
      else if(this.name == "")
        this.query= "?con="+this.con+"&year="+this.year;
      else if(this.con == "")
        this.query= "?name="+this.name+"&year="+this.year;
      else if(this.year == "")
        this.query= "?con="+this.con+"&name="+this.name;
      else
          this.query="?name="+this.name+"&con="+this.con+"&year="+this.year;
        console.log(this.query);
        this.data.sendData(this.query);
    }
    ngOnInit()
    {
      this.filteredOptions = this.pageForm.controls['con'].valueChanges.pipe(startWith(''),map(value => this._filter(value)));
    }
    private _filter(value: string): string[]
    {
      var filterValue = value.toLowerCase();
      return this.countries.filter(country => country.toLowerCase().includes(filterValue));
    }
    //Country List (Do Not Modify)
    countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
}
