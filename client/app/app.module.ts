import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes,Router } from '@angular/router';
import { NouisliderModule } from 'ng2-nouislider';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/fontawesome-free';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { TestComponent } from './test/test.component';
import { TagComponent } from './tag/tag.component';
import {TextComponent} from './text/text.component';

import {DataService} from './data.service';
const appRoutes: Routes = [
  {
    path: '',
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
    MatExpansionModule,
    MatTabsModule,
    NouisliderModule,
    MatRadioModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    LeafletModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
