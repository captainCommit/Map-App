import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider'


import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { TestComponent } from './test/test.component';

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
  }
];
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
