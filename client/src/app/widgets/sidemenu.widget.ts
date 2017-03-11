import {Widget} from "./base.widget";

export class Sidemenu extends Widget{

    constructor(containerId:string,properties:any){
        super(containerId)
        let data = [
            super.getConfig(['id', '1'], ['value', "Customers"], ['icon', 'user']),
            super.getConfig(['id', '2'], ['value', "Products"], ['icon', 'cube']),
            super.getConfig(['id', '3'], ['value', "Reports"], ['icon', 'line-chart']),
            super.getConfig(['id', '4'], ['value', "Archives"], ['icon', 'database']),
            super.getConfig(['id', '5'], ['value', "Settings"], ['icon', 'cog']),
        ]

        let body = super.getConfig(
            ['view', "list"],
            ['borderless', 'true'],
            ['scroll', 'false'],
            ['template', "<span class='webix_icon fa-#icon#'></span> #value#"],
            ['data', data],
            ['select', true],
            ['type', {height: 40}]
        )

        this.config= super.getBaseConfig(
            "sidemenu",
            properties,
            ['state',state=>{
                let toolbarHeight = $$("myToolbar").$height;
                state.top = toolbarHeight;
                state.height -= toolbarHeight;
            }],
            ['body', body]
        )
    }

}

