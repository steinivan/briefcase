import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { DataConditionService } from '../service/dataCondition/data-condition.service';
@Directive({
  selector: '[appCreateElement]'
})
export class CreateElementDirective implements AfterViewInit {
  private iconAdd:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-plus" class="svg-inline--fa fa-circle-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"></path></svg>';
  private iconSave:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" class="svg-inline--fa fa-circle-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path></svg>';
  private iconEdit:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"></path></svg>';
  private iconCross:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>'
  private iconDelete:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-minus" class="svg-inline--fa fa-circle-minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"></path></svg>'

  private active:string;
  private name:string;
  clickEditListen: () => void;
  clickCancelListen: () => void;
  clickDeleteListen: () => void;
  constructor(private renderer:Renderer2,private ref:ElementRef,private saveStatus:DataConditionService) {   }
  

  @Input() set appCreateElement(name:string){
    this.active = name;
    if(name===this.name){
      this.editMode('createEdit');
    } 
    if(name!==this.name && name!=='') {
      this.editMode('reset');
    }
  }
  @Output() eventEdit:EventEmitter<string> = new EventEmitter<string>();
  @Output() dataEmit:EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteDataEmit:EventEmitter<string> = new EventEmitter<string>();


  UppercaseOneLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  removeText(extract:any,remove:string){
    return extract.split(remove)[1].toLowerCase();
  }
  clickEmitName(mode?:any){
    try{
      const icon = this.renderer.selectRootElement(`#${this.name}Icon`,true)
      if(mode==='edit'){
        this.clickEditListen = this.renderer.listen(icon,'click',(event)=>{
          this.eventEdit.emit(this.name)
        })
        return
      }
      this.clickEditListen = this.renderer.listen(icon,'click',(event)=>{
        this.eventEdit.emit(this.name)
        this.editMode('edit')
      })
    } catch(error){
    }
  }

  ngAfterViewInit(): void {
    let id = this.removeText(this.ref.nativeElement.id,'SKILLS')
    this.name=id;
    this.clickEmitName();
  }
  
  editMode(type:string,action?:any){
    const containTitle = this.renderer.selectRootElement(`.${this.name}Div`,true)
    const icon = this.renderer.selectRootElement(`#${this.removeText(this.ref.nativeElement.id,'SKILLS')}Icon`,true)
    const iconCross = this.renderer.createElement('fa-icon');
    const iconSave = this.renderer.createElement('fa-icon');
    this.renderer.setProperty(iconCross,"innerHTML", this.iconCross)
    this.renderer.setProperty(iconSave,"innerHTML", this.iconSave)
    switch (type) {
      case 'createEdit':
        this.createEdit(icon,containTitle,iconCross)
        break;
      case 'reset':
        this.resetEdit(icon,containTitle)  
        break;
      case 'edit':
        if(action===undefined)action='addDelete'
        this.edit(icon,action)
        break;
      case 'create':
        if(action===undefined)action='add'
        this.create(icon,action)
        break;
      case 'save':
        this.save(action)
        break;
      case 'delete':
        this.delete(action)
        break;
    
      default:
        break;
    }
  }

  createEdit(icon:any,title:any,iconCross:any){
    this.renderer.setProperty(icon,"innerHTML",this.iconAdd)
    this.renderer.addClass(iconCross,`${this.name}IconCross`)
    this.clickCancelListen = this.renderer.listen(iconCross,"click",(event)=>{
      const itemList = document.querySelectorAll('.li-'+this.name)[0].children[0].id === 'input-create'
      this.eventEdit.emit(' ')
      this.saveStatus.saveStatus(false)
      if(itemList){
        this.editMode('create',"remove")
      }
    })
    this.renderer.appendChild(title,iconCross)
    this.clickEditListen()
    this.clickEditListen = this.renderer.listen(icon,"click",(event)=>{
      this.editMode('create')
    })
  }

  createLiInput(){
    const inputItem = this.renderer.createElement('li')
    const input = this.renderer.createElement('input')
    this.renderer.addClass(inputItem,'li-'+this.name)

    this.renderer.addClass(input,'text-center')
    this.renderer.addClass(input,'border-white')
    this.renderer.addClass(input,'border')
    this.renderer.addClass(input,'rounded')
    this.renderer.setProperty(input,'type',"text")
    this.renderer.setProperty(input,'id',"input-create")
    this.renderer.appendChild(inputItem,input)
    return inputItem
  }

  create(icon:any,action:string){
    const item = this.renderer.selectRootElement('.li-'+this.name,true)
    let value:any;
    if(action==='add'){
      const inputItem = this.createLiInput()
      this.renderer.setProperty(icon,"innerHTML",this.iconSave)
      this.renderer.insertBefore(this.ref.nativeElement,inputItem,item)
      this.clickEditListen()
      this.clickEditListen = this.renderer.listen(icon,"click",(event)=>{
        value = {name:this.renderer.selectRootElement('#input-create').value,type:this.name}
        this.editMode('save',value)
        this.saveStatus.saveStatus(true)
      })
    } else {
      const ref = this.ref.nativeElement
      const itemCreate = this.renderer.selectRootElement('#input-create').parentNode
        this.renderer.removeChild(this.ref.nativeElement,itemCreate)
        this.editMode('reset')
    }
  }
  save(value:any){
    const itemCreate = this.renderer.selectRootElement('#input-create').parentNode
    this.renderer.removeChild(this.ref.nativeElement,itemCreate)
    this.editMode('reset')
    this.dataEmit.emit(value)
    this.eventEdit.emit(' ')
  }
  delete(value:any){
    const item = value.id
    this.deleteDataEmit.emit(item)

  }
  edit(icon:any,action:string){
    const itemList = document.querySelectorAll('.li-'+this.name)
    itemList.forEach(item => {
      const iconDelete = this.renderer.createElement('fa-icon');
      this.renderer.setProperty(iconDelete,"innerHTML", this.iconDelete)   
      this.renderer.setProperty(iconDelete,"id", "iconDelete")   
      this.renderer.addClass(iconDelete, "faMinus")  
      if(action==='addDelete'){
        this.clickDeleteListen = this.renderer.listen(iconDelete,"click",(event)=>{
          this.editMode("delete",this.renderer.parentNode(iconDelete))
        })
        this.renderer.appendChild(item,iconDelete)
      } else {
        const faIconCross = item.childNodes[1]?item.childNodes[1]:undefined;
        if(faIconCross){
          this.renderer.removeChild(item,faIconCross)
        }
      }
    })
  }
  
  resetEdit(icon:any,title:any){
    const iconCross = document.querySelector(`.${this.name}IconCross`)?this.renderer.selectRootElement(`.${this.name}IconCross`,true):null
    this.renderer.setProperty(icon,"innerHTML",this.iconEdit)
    if(iconCross){
      this.clickEditListen()
      this.clickDeleteListen()
      this.clickCancelListen()
      this.editMode('edit','remove')
      this.renderer.removeChild(title,iconCross)
      this.clickEmitName()
    } else {
      this.clickEditListen()
      this.clickEmitName()
    }
  }

}
