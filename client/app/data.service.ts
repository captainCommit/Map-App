import { Injectable ,EventEmitter,Output} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';


@Injectable()
export class DataService {

  userDataSource: BehaviorSubject<{}> = new BehaviorSubject({});
  data = this.userDataSource.asObservable();
  response : any;
  query ="?";
  change : EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor(private http : HttpClient) { }
  sendData(query : string){
    this.query = query;
    this.http.get('/person'+this.query).subscribe(res => {console.log(res);this.userDataSource.next(res);},err => {console.log(err);} );
    console.log("Data Sent");
  }
}
