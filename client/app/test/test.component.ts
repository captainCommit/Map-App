import { Component, OnInit,ComponentRef, Injector, DoCheck} from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L from "leaflet";

import { DataService } from '../data.service';
var Markers = new Array();
@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //person array
  persons :any;
  location :any[]= [];
  area:number;
  bounds : any;
  value : number;
  //Open Street Maps Layer
  streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  //Leaflet options
  map;
  options = {
    layers: [this.streetMaps],
    zoom: 4,
    center: L.latLng([28.6139,77.2090])
  };
  //layersControl object
  layers = [];
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private data1 : DataService)
  {
    this.data1.userDataSource.subscribe(res => {
      this.persons = res;
      console.log(this.persons);
    },err =>{console.log(err)})
  }
  onMapReady(map)
  {
    this.options = {
      layers: [this.streetMaps],
      zoom: 4,
      center: L.latLng([28.6139,77.2090])
    };
    this.data1.userDataSource.subscribe(res =>
      {
          this.persons = res;
          console.log(this.persons);
          this.map = map;
          console.log(this.map);
          var marker;
          Markers = [];
          this.location=[];
          if(Markers)
              map.removeLayer(Markers);
          for(var i =0;i < this.persons.length;i++)
          {
              this.location.push([this.persons[i].species, this.persons[i].latitude,this.persons[i].longitude]);
          }
          console.log(this.location);
          for(var i = 0;i<this.location.length;i++)
          {
              var x = this.location[i][1]+"";
              var y = this.location[i][2]+"";
              var msg = this.location[i][0]+"";
              Markers.push(new L.Marker([x,y]).bindPopup(msg).addTo(this.map));
          }
          console.log(Markers);
          console.log(this.layers);
          console.log("Map Init");
      },err =>{console.log(err)});
  }
  change(event : any)
  {
      this.data1.calcarea(event.target.getBounds());
      this.data1.filterdata(event.target.getBounds());
  }
  ngOnInit()
  {
      this.data1.userDataSource.subscribe(res => {
      this.persons = res;
      console.log(this.persons);
      this.options = {
        layers: [this.streetMaps],
        zoom: 4,
        center: L.latLng([28.6139,77.2090])
      };

    },err =>{console.log(err)});
  }
  buildmap()
  {
    this.map = L.map('mapid').setView([28.6139,77.2090], 5);
    //Set Map-Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);

  }
}
