import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import L from "leaflet";

declare let L;
var mymap;
var marker;


@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  persons :any;
  location :any[]= [];
  value : number;
  //form data
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
        this.http.get('/person'+query).subscribe(res =>
        {
            this.persons =res;
            console.log(this.persons);
          },
          (err) => {console.log(err)});
  }
  show(lat : string, long : string,name: string)
  {
    window.scrollTo(0,document.body.scrollHeight);
    var map = document.getElementById('mapid');
    map.style.visibility = "visible";
    if(marker)
      mymap.removeLayer(marker);
    if(mymap!=undefined)
        mymap.remove();
    this.buildmap();
    marker = new L.marker([lat,long]).bindPopup(name).addTo(mymap);
  }
  ngOnInit()
  {}
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
