import {ElementRef, Input, AfterContentInit, OnInit, HostListener, Component} from "@angular/core";

export const widgetOptions = {
    selector: 'widget',
    template: ''
};

@Component(widgetOptions)
export class WidgetComponent implements OnInit, AfterContentInit {
    private root: ElementRef;
    private _ui: webix.ui.baseview;
    private _containerId: string
    private properties: any
    @Input()
    id: string
    @Input()
    width: string
    @Input()
    height: string
    @Input()
    type: string
    @Input()
    paddingX: string
    @Input()
    paddingY: string
    @Input()
    align: string
    @Input()
    position: string
    @Input()
    css: string

    constructor(root: ElementRef, containerId: string) {
        this.root = root
        this._containerId = containerId
    }

    get ui(): webix.ui.baseview {
        return this._ui;
    }

    set ui(value: webix.ui.baseview) {
        this._ui = value;
    }

    setProperties(){

    }


    getElementById(id): any {
        let elements = this.root.nativeElement.querySelectorAll("[view_id]")
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].getAttributeNode('view_id').value = id) {
                return elements[i]
            }
        }
        return null
    }

    widget(containerId: string, properties: any): any {

    }

    ngOnInit() {
        let container = document.createElement('div')
        container.id = this._containerId
        this.root.nativeElement.appendChild(container)
        let properties = {
            id: this.id ? this.id : null,
            position: this.position ? this.position : null,
            width: this.width ? +this.width : null,
            height: this.height ? +this.height : null,
            type: this.type ? this.type : null,
            paddingX: this.paddingX ? +this.paddingX : null,
            paddingY: this.paddingY ? +this.paddingY : null,
            align: this.align ? this.align : null,
            css: this.css ? this.css : null
        }
        for (let key in properties) {
            if (null == properties[key]) {
                delete properties[key]
            }
        }
        this.properties = properties
        this._ui = this.widget(this._containerId, this.properties);
    }

    ngAfterContentInit() {
        this._ui.resize()
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {

    }

    @HostListener('document:scroll', ['$event'])
    onScroll(event) {

    }

}
