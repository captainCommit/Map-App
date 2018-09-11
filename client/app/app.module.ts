import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes,Router } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider'
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { TestComponent } from './test/test.component';
import { TagComponent } from './tag/tag.component';
import {TextComponent} from './text/text.component';

import {DataService} from './data.service';
const appRoutes: Routes = [
  {
    path:'',
    component:TextComponent,
    data: {title: 'Map-App'}
  },
  {
    path: 'gallery',
    component: PageComponent,
    data: { title: 'Map-App' }
  },
  {
    path: 'filter',
    component : TestComponent,
    data: {title : 'Map-App'}
  },
  {
    path: 'tag',
    component: TagComponent,
    data: {title : 'Map-App'}
  }
];
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TestComponent,
    TagComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatTabsModule,
    MatAutocompleteModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
