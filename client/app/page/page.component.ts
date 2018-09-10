import { Component,OnInit} from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import L from "leaflet";

import { DataService } from "../data.service";

//leaflet import
declare let L;
var mymap;
var markers = new Array();

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit
{
  //map data
  //person arrau
  persons: any;
  location :any[]= [];
  message : any[];
  //form data
  pageForm = new FormGroup({
    name: new FormControl(''),
    con: new FormControl(''),
    year: new FormControl('')
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private data : DataService)
  {
    this.data.userDataSource.subscribe(res => {this.persons = res},err =>{console.log(err)})
  }
  ngOnInit()
  {
  }
  change(event)
  {
  }
  onSubmit()
  {
      /*var query;
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
        this.http.get('/person'+query).subscribe(res =>
        {
            this.persons =res;
            markers = []
            console.log(this.persons);
            this.location=[];
            if(markers)
              mymap.removeLayer(markers);
            if(mymap!=undefined)
                mymap.remove();
            this.buildmap();
            for(var i =0;i < this.persons.length;i++)
            {
                this.location.push([this.persons[i].name, this.persons[i].lat ,this.persons[i].long]);
            }
            for(var i = 0;i < this.location.length ; i++)
            {
                var x = this.location[i][1]+"";
                var y = this.location[i][2]+"";
                markers.push(new L.marker([x,y]).bindPopup(this.location[i][0]).addTo(mymap));
            }
            console.log(markers);
        },
        (err)=>
        {
          console.log(err)
        });*/
  }
   //Add Marker to map
  buildmap()
  {
    mymap = L.map('mapid').setView([0,0], 1);
    //Set Map-Layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);

  }
}
