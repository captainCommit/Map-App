import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(){
      var map = new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        target: 'map',
        view: new View({
          projection: 'EPSG:4326',
          center: [0, 0],
          zoom: 2
        })
      });
    console.log("Map Running");
  }

}
