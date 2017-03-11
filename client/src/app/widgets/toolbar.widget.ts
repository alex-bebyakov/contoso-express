import {Widget} from "./base.widget";

export class Toolbar extends Widget{

    constructor(containerId:string,properties:any){
        super(containerId)
        let elements=[
            super.getConfig(
                ['view', "icon"],
                ['icon', "bars"],
                ['click', function(){
                    if( $$("myMenu").config.hidden){
                        $$("myMenu").show();
                    }
                    else
                        $$("myMenu").hide();
                }]
            ),
            {},
          super.getConfig(
            ['view', "search"],
            ['placeholder', "..."],
            ['width',300],
            ['css','search_bar']
          ),
            super.getConfig(
                ['view', "button"],
                ['label',"Войти"],
                ['width',80],
                ['type', "icon"],
                ['icon', "sign-in"]
            ),
            super.getConfig(
                ['view', "button"],
                ['width',140],
                ['label',"Регистрация"],
                ['type', "icon"],
                ['icon', "user"]
            ),
        ]
        this.config=super.getBaseConfig(
            "toolbar",
            properties,
            ['elements',elements])

    }

}


