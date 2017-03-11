import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar.component';
import {SidemenuComponent} from "./components/sidemenu.component";
import {ComplexComponent} from "./components/complex.component";

@NgModule({
  declarations: [
    AppComponent,ToolbarComponent,SidemenuComponent,ComplexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
