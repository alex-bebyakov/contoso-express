import {Component,ElementRef} from '@angular/core';

import {WidgetComponent, widgetOptions} from "./widget.component";
import {Toolbar} from "../widgets/toolbar.widget";


export const toolbarOptions =Object.assign({},widgetOptions,{
  selector: 'toolbar'
})

@Component(toolbarOptions)
export class ToolbarComponent extends WidgetComponent{

  constructor(root: ElementRef) {
    super(root,"toolbar_container")

  }

  widget(containerId:string,properties:any){
    return <webix.ui.toolbar> webix.ui(new Toolbar(containerId,properties).config);
  }

  ngAfterContentInit(){
    let element=super.getElementById(this.id)
    element.style.position='fixed'
    element.style.zIndex='10001'
    this.ui.resize()
  }

  onResize(){
    this.ui.resize()
 }
}
