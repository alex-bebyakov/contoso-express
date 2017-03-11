import {ElementRef, Component} from '@angular/core';
import {WidgetComponent, widgetOptions} from "./widget.component";

@Component({
    selector: 'form'
})
export class FormComponent extends WidgetComponent {

    constructor(root: ElementRef) {
        super(root)
    }

    widget(){
        let cols=[
            super.getConfig(false,['view', "button"], ['value', "Войти"],['type', "form"]),
            super.getConfig(false,['view', "button"], ['value', "Назад"]),
        ]
        let elements=[
            super.getConfig(false,['view', "text"], ['label', "Логин"]),
            super.getConfig(false,['view', "text"],['type', "password"], ['label', "Пароль"]),
            super.getConfig(false,['margin', 5], ['cols', cols]),
        ]
        let body=super.getConfig(false,['view', 'form'], ['id', this.id],['width', this.width],['elements', elements])
        let rows=[
            super.getConfig(false,['align', this.align], ['body', body])
        ]
        let config=super.getConfig(true,['view'],['rows',rows])
        return <webix.ui.form> webix.ui(config)
    }
}
