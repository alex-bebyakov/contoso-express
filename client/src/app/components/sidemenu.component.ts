import {Component, ElementRef} from '@angular/core';
import {WidgetComponent, widgetOptions} from "./widget.component";
import {Sidemenu} from "../widgets/sidemenu.widget";


export const sidemenuOptions =Object.assign({},widgetOptions,{
  selector: 'sidemenu'
})

@Component(sidemenuOptions)
export class SidemenuComponent extends WidgetComponent {

  constructor(root: ElementRef) {
    super(root,"sidemenu_container")
  }

  widget(containerId:string,properties:any) {


    return <webix.ui.sidemenu> webix.ui(new Sidemenu(containerId,properties).config);
  }
}



