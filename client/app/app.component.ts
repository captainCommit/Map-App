import { Component, OnInit,EventEmitter,Input} from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

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
  message : string;
  persons :any;
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
      var query;
      var name = this.pageForm.value.name;
      var con = this.pageForm.value.con;
      var year = this.pageForm.value.year;
      if(name == "" && con == "" && year =="")
        query="?";
      else if(year == "" && name == "")
          query="?con="+con;
      else if(year == "" && con == "")
          query="?name="+name;
      else if(name == "" && con == "")
          query="?year="+year;
      else if(name == "")
          query= "?con="+con+"&year="+year;
      else if(con == "")
          query= "?name="+name+"&year="+year;
      else if(year == "")
          query= "?con="+con+"&name="+name;
      else
          query="?name="+name+"&con="+con+"&year="+year;
        console.log(query);
        this.data.sendData(query);
    }
    ngOnInit()
    {}
}
