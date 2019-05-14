import { Component, OnInit } from '@angular/core';

import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { click, singleClick } from 'ol/events/condition';
import Select from 'ol/interaction/Select';

@Component({
  selector: 'app-mapol',
  templateUrl: './mapol.component.html',
  styleUrls: ['./mapol.component.scss']
})
export class MapolComponent implements OnInit {

  map: Map;
  vectorSource: VectorSource = new VectorSource();

  constructor() { }

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({ url: 'https://{a-c}.tile.osm.org/{z}/{x}/{y}.png' })
        }),
        new VectorLayer({
          source: this.vectorSource,
          style: [
          ]
        })
      ],
      view: new View({
        center: [370379, 4041677],
        zoom: 5
      })
    });

    const geojson =  {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [
              -3.703790, 40.416775
            ]
          }
        }
      ]
    };

    this.vectorSource.addFeatures((new GeoJSON()).readFeatures(geojson, {
      dataProjection : 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }));
  }
}
