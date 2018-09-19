import { Injectable ,EventEmitter,Output} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';


@Injectable()
export class DataService {

  area: number;
  userDataSource: BehaviorSubject<{}> = new BehaviorSubject({});
  areaSource : BehaviorSubject<Number> = new BehaviorSubject(0);
  data = this.userDataSource.asObservable();
  response : any;
  query ="?";
  change : EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor(private http : HttpClient) { }
  sendData(query : string){
    this.query = query;
    this.http.get('/gens'+this.query).subscribe(res =>
      {
        console.log(res);
        this.userDataSource.next(res);
        this.response = res;
      },
      err =>
      {
        console.log(err);
      });
    console.log("Data Sent");
  }
  onClick(name : string, type : string, start : number,end:number)
  {
    var query ="";
    if(name == undefined)
        name = "";
    if(type == undefined)
        type = "";
    if(name=="" && type == "")
        query="?";
    else if(type == "")
        query="?";
    else if(name == "")
        query="?";
    else
    {
        query="?type="+type+"&name="+name;
        if(type == "any")
          query = "?name="+name+"&type="+type;
        else
          query = "?"+type+"="+name;
    }
    if(query == "?")
        query = query+"start="+start+"&end="+end;
    else
        query = query+"&start="+start+"&end="+end;
    this.sendData(query);
  }
  filterdata(bounds : any)
  {
        var upper_lng = bounds._northEast.lng;
        var lower_lng = bounds._southWest.lng;
        var upper_lat = bounds._northEast.lat;
        var lower_lat = bounds._southWest.lat;
        this.http.get('/bbox/'+upper_lat+'/'+upper_lng+'/'+lower_lat+'/'+lower_lng+this.query).subscribe( res =>
          {
            console.log(res);
            this.userDataSource.next(res);
          },err => {
            console.log(err);
          })
  }
  calcarea(bounds : any)
  {
      var temp = []
      this.area = Math.abs(parseFloat(bounds._southWest.lng) - parseFloat(bounds._northEast.lng))*Math.abs(parseFloat(bounds._southWest.lat) - parseFloat(bounds._northEast.lat));
      this.areaSource.next(this.area);
  }
}
