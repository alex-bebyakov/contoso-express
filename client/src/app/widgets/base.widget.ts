export class Widget {

  private _config:any

  get config(): any {
    return this._config;
  }

  set config(value: any) {
    this._config = value;
  }

  constructor(private containerId:string){

  }

  getConfig(...pars):any{
    let result={}
    pars.forEach(par=>{
      if(par[1]){
        result[par[0]]=par[1]
      }
    })
    return result
  }

  getBaseConfig(view:string,properties:any,...pars){
    let result= {
      container: this.containerId,
      view:view,

    }
    for(let key in properties){
      result[key]=properties[key]
    }

    pars.forEach(par=>{
      if(par[1]){
        result[par[0]]=par[1]
      }
    })
    return result
  }
}
