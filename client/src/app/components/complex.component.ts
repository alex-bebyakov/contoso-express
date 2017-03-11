import {Component,ElementRef} from '@angular/core';

import {WidgetComponent, widgetOptions} from "./widget.component";
import {Toolbar} from "../widgets/toolbar.widget";
import {Sidemenu} from "../widgets/sidemenu.widget";


export const complexOptions =Object.assign({},widgetOptions,{
    selector: 'complex'
})

@Component(complexOptions)
export class ComplexComponent extends WidgetComponent{
    private toolbar:Toolbar

    constructor(root: ElementRef) {
        super(root,"complex_container")

    }

    widget(containerId:string,properties:any){
        this.toolbar=new Toolbar("",{id:"myToolbar"})

        return webix.ui({
            container:containerId,
            rows: [
            this.toolbar.config,
                {template:""}

    ],
            })
    }

    onResize(){
        this.ui.resize()
    }
}

