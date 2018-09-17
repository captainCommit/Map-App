import { Component, OnInit,Injectable,EventEmitter,Input} from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouiFormatter } from "ng2-nouislider";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { BehaviorSubject,merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {DataService} from './data.service';
import { Validators } from '@angular/forms';
//Tree View  Setup
export class DynamicFlatNode {
  public next:string
  public http:HttpClient;
  constructor(public item: string, public level = 1, public expandable = false,public hierarchy :string = "phylum",public isLoading = false)
  {
      this.findNext();
  }
  findNext()
  {
    if(this.hierarchy == "phylum")
          this.next = "classes"
    else if(this.hierarchy == "classes")
          this.next = "orders";
    else if(this.hierarchy == "orders")
          this.next ="family"
    else if(this.hierarchy == "family")
          this.next = "genus"
    else if(this.hierarchy == "genus")
          this.next = "subgenus"
    else if(this.hierarchy == "subgenus")
          this.next = "speices"
    else if(this.hierarchy == "species")
          this.next = "subspeices"
    else
          this.next="";
  }
  isExpandable() : boolean
  {
        var value = false;
        this.http.get('/buildtree/'+this.next+"?"+this.hierarchy+"="+this.item).subscribe(res => {
          if(res.toString().length > 0)
                value = true;
          else
                  value = false;
        })
        return value;
  }
}
export class DynamicDatabase
{
    rootLevelNodes: string[] = ["Mollusca","Cnidaria","Chordata","Arthropoda","Echinodermata","Cindaria","Porifera","Cnindaria","Platyhelminthes"];
    dataMap = new Map([
          ['Mollusca', ["Gastropoda","Bivalvia","Cephalopoda"]],
          ['Cnidaria', ["Zoantharia","Actiniaria","Scleractinia","Semaeostomeae","Rhizostomeae","Anthoathecata","Gorgonacea","Antipatharia"]],
          ['Chordata', ["Pleurogona","Enterogona","Suliformes","Passeriformes","Anseriformes","Gruiformes","Rodentia","Squamata","Anura","Ciconiiformes","Columbiformes","Coraciformes","Perciformes","Aplousobranchia","Phelbobranchia","Stolidobranchia","Charadriiformes","Apodiformes","Chiroptera","Anguilliformes","Ophidiformes"]],
          ['Arthropoda',["Lepidoptera","Hymenoptera","Diptera","Decapoda","Odonata","Hemiptera","Anomura","Araneae","Calanoida","Scorpiones","Isopoda"]],
          ['Echinodermata',["Aspidochirotida","Apodida","Valvatida"]],
          ['Cindaria',["Scleractinia","Anthoathecat"]],
          ['Porifera',["Poeciloscerida","Haplosclerida","Dictyoceratida","Halichondrida","Spirophorida"]],
          ['Cnindaria',["Scleractinia","Actiniaria","Semaeostomeae","Anthoathecata"]],
          ['Platyhelminthes',["Polycladida","Polycladidia"]],
          ['Gastropoda',["Archaeogastropoda",'Mesogastropoda','Neogastropoda','Nudibranchia','Cephalaspedia','Littorinimorpha','Systellommatophora','Caenogastropoda','Cephalaspidea','Cycloneritimorpha','','Sacoglossa','Neoloricata','Archaeopulmonata','Architectonoidea','Basommatophora','Acteonoidea','Littorinamorpha','Notaspedia']],
          ['Bivalvia',["Veneroida","Limoida","Pterioda","Arcoida","Mytiloida","Euheterodonta","Pectinoida"]],
          ['Cephalopoda',[ "Cephalaspidea", "Spirulida", "Octopoda" ]]
        ]);
      //Initial data from database
      initialData(): DynamicFlatNode[] {
        return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
      }

      getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
      }

      isExpandable(node: string): boolean {
        return this.dataMap.has(node);
      }
}

@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange!.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors*/
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /*Toggle the node, remove from display list*/

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [DynamicDatabase]
})




export class AppComponent implements OnInit
{
  //Class Data
  activeLinkIndex = -1;
  persons :any;
  query : string;
  name:string;
  type:string;
  result : any[];
  title = 'map-app';
  location :any[]= [];
  area : any;
  //slider control
  start = "1857"
  end= "1947"
  //spatial query
  locality : string
  //Autocomplete ArrayList
  filteredOptions: Observable<string[]>;


  constructor(private router : Router,private route: ActivatedRoute, private http: HttpClient,private data : DataService,database: DynamicDatabase)
  {
    data.changeTab.subscribe(res => this.activeLinkIndex = res);
    data.userDataSource.subscribe(res => {console.log(res);},err => {});
    data.areaSource.subscribe(res => {this.area = res; console.log(res);},err => {console.log(err);})
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.dataSource.data = database.initialData();
  }
//treeview
node = new DynamicFlatNode("Mollusca",0,true,"phylum",false)
treeControl: FlatTreeControl<DynamicFlatNode>;
dataSource: DynamicDataSource;
getLevel = (node: DynamicFlatNode) => node.level;
isExpandable = (node: DynamicFlatNode) => node.expandable;
hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

//routing wndow
  routeLinks = [
            {
                label: 'Gallery',
                path: '/',
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


  //General Search Form Elements
  generalForm = new FormGroup({ name: new FormControl('',Validators.required), type: new FormControl('')});
  //Taxonomical Search Elements
  types = ["any","phylum","genus","family","order","species"];
  //Spatial Search Form Elements
  spatialForm = new FormGroup({state : new FormControl('')});
  //SLider Form
  sliderRange : number ;
  someKeyboardConfig: any = {
    connect: true,
    start: [1857,1947],
    step: 1,
    range: {
      min: 1761,
      max: 2019
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    },
    behaviour: 'drag'
  };

  //form submit
  onSubmit_general()
  {
      this.name = this.generalForm.value['name'];
      this.type = this.generalForm.value['type'];
      if(this.name == undefined)
          this.name = "";
      if(this.type == undefined)
          this.type = "";
      if(this.locality == undefined)
          this.locality = "";
      if(this.name=="" && this.type == "")
          this.query="?";
      else if(this.type == "")
          this.query="?";
      else if(this.name == "")
          this.query="?";
      else
      {
          this.query="?type="+this.type+"&name="+this.name;
          if(this.type == "any")
            this.query = "?name="+this.name+"&type="+this.type;
          else
            this.query = "?"+this.type+"="+this.name;
      }
      if(this.query == "?")
          this.query = this.query+"start="+this.start+"&end="+this.end;
      else
          this.query = this.query+"&start="+this.start+"&end="+this.end;
      if(this.locality == "")
          this.query = this.query;
      else
          this.query = this.query+"&state="+this.locality;
      console.log(this.query);
      this.data.sendData(this.query);
      this.activeLinkIndex = -1;
  }
  onSubmit_spatial()
  {
      this.locality = this.spatialForm.value['state'];
      if(this.locality == undefined)
          this.locality="";
      if(this.name == undefined)
          this.name = "";
      if(this.type == undefined)
          this.type = "";
      if(this.name=="" && this.type == "")
          this.query="?";
      else if(this.type == "")
          this.query="?";
      else if(this.name == "")
          this.query="?";
      else
      {
          this.query="?type="+this.type+"&name="+this.name;
          if(this.type == "any")
              this.query = "?name="+this.name+"&type="+this.type;
          else
              this.query = "?"+this.type+"="+this.name;
      }
      if(this.query == "?")
          this.query = this.query+"start="+this.start+"&end="+this.end;
      else
          this.query = this.query+"&start="+this.start+"&end="+this.end;
      if(this.locality == "")
          this.query = this.query;
      else
          this.query = this.query+"&state="+this.locality;
      console.log(this.query);
      this.data.sendData(this.query);
      this.activeLinkIndex = -1;
  }
    ngOnInit()
    {
      this.filteredOptions = this.spatialForm.controls['state'].valueChanges.pipe(startWith(''),map(value => this._filter(value)));
    }

    private _filter(value: string): string[]
    {
      var filterValue = value.toLowerCase();
      return this.states_ut.filter(country => country.toLowerCase().includes(filterValue));
    }
    change(event:any)
    {
        this.start = event[0];
        this.end = event[1];
        if(this.name == undefined)
            this.name = "";
        if(this.type == undefined)
            this.type = "";
        if(this.locality==undefined)
            this.locality ="";
        if(this.name=="" && this.type == "")
            this.query="?";
        else if(this.type == "")
            this.query="?";
        else if(this.name == "")
            this.query="?";
        else
        {
            this.query="?type="+this.type+"&name="+this.name;
            if(this.type == "any")
              this.query = "?name="+this.name+"&type="+this.type;
            else
              this.query = "?"+this.type+"="+this.name;
        }
        if(this.query == "?")
            this.query = this.query+"start="+this.start+"&end="+this.end;
        else
            this.query = this.query+"&start="+this.start+"&end="+this.end;
        if(this.locality == "")
            this.query = this.query;
        else
            this.query = this.query+"&state="+this.locality;
        console.log(this.query);
        this.data.sendData(this.query);
        this.activeLinkIndex = -1;
    }
    //State  List (Do Not Modify)
    states_ut = ["Andhra Pradesh","Andaman and Nicobar Islands","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Pondicherry","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
}
