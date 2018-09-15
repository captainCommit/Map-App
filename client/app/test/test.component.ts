import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L from "leaflet";
import { DataService } from '../data.service';
//leaflet import
declare let L;
var mymap;
var markers = new Array();
@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //map data
  //person array
  persons :any;
  area:number;
  bounds : any;
  value : number;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private data1 : DataService)
  {
    this.data1.userDataSource.subscribe(res => {
      this.persons = res;
      console.log(this.persons);
    },err =>{console.log(err)})
  }
  options = {
    layers: [ L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 1,
    center: L.latLng(0,0)
};
onChange(event)
{
    this.extent(event.target.getBounds());
}
extent(bounds : any)
{
    console.log(parseFloat(bounds._southWest.lng)+"   "+parseFloat(bounds._northEast.lng)+"   "+parseFloat(bounds._southWest.lat)+"   "+parseFloat(bounds._northEast.lat));
    this.area = Math.abs(parseFloat(bounds._southWest.lng) - parseFloat(bounds._northEast.lng))*Math.abs(parseFloat(bounds._southWest.lat) - parseFloat(bounds._northEast.lat));
    console.log(this.area);
}
  ngOnInit()
  {
    //Declaring MAP
    /*mymap.on('zoomend', function() {
     alert(mymap.getBounds());
    });
    this.data1.userDataSource.subscribe(res => {
      this.persons = res;
      console.log(this.persons)
      this.location=[];
      markers = [];
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
    },err =>{console.log(err)})
    console.log("Map Init");*/
  }
}
