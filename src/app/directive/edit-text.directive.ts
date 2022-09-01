import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { DataConditionService } from '../service/dataCondition/data-condition.service';

@Directive({
  selector: '[appEditText]'
})
export class EditTextDirective implements AfterViewInit,OnChanges{
  private iconSave:string='<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" class="svg-inline--fa fa-circle-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path></svg>';
  private clickCount = 0;
  private id:string;
  private type:string;
  private clickSaveEdit: ()=>void;
  @Output() saveInput:EventEmitter<string[]> = new EventEmitter<string[]>();
  constructor(private renderer:Renderer2,private ref:ElementRef, private saveStatus:DataConditionService) {
  }
  private status:boolean;
  
  @Input() set appEditText(status:string) {
    this.status = status===this.type?true:false;
    this.conditionStatus()
  }
  ngOnChanges():void{
    this.saveStatus.saveOrNotChange.subscribe(item=>{
      if(!this.status){return}
      const idItem = this.cleanInput(this.ref.nativeElement.id.split('-')[1])
      if(item){
        this.saveInput.emit([this.ref.nativeElement.value.toLowerCase(),this.ref.nativeElement.id.split('-')[1]])
        this.deleteSaveIcon()
        this.id = this.cleanInputId(this.ref.nativeElement.value.toLowerCase())
      } else {
        this.renderer.setProperty(this.ref.nativeElement,"value",idItem.toUpperCase())
        this.deleteSaveIcon()
      }
    })
  }
  conditionStatus(){
    const status = this.status
    if(status){
      this.renderer.addClass(this.ref.nativeElement,"onlyText")
      this.renderer.setProperty(this.ref.nativeElement,"disabled",false)
      this.renderer.setProperty(this.ref.nativeElement,"readOnly",true)
      this.renderer.removeClass(this.ref.nativeElement,"select-text")
    } else {
      this.renderer.setProperty(this.ref.nativeElement,"readOnly",false)
      this.renderer.setProperty(this.ref.nativeElement,"disabled",true)
      this.renderer.addClass(this.ref.nativeElement,"select-none")
      this.renderer.removeClass(this.ref.nativeElement,"select-text")
    }
  }
  ngAfterViewInit(): void {
    const item = this.ref.nativeElement
    this.type = this.renderer.parentNode(item).classList[0].split('-')[1]
    this.id = this.ref.nativeElement.id.split('-')[1]
  }
  @HostListener("click" , ['$event'])
  private click($event:Event) {
    this.clickCount++;
    setTimeout(() => {
        if (this.clickCount === 1) {
        } else if (this.clickCount === 2) {
          this.editItem()
        }
        this.clickCount = 0;
    }, 250)
  }
  @HostListener('keyup',['$event'])
  private keyEnter(event:KeyboardEvent){
    if(event.key === 'Enter'){
      this.renderer.addClass(this.ref.nativeElement,"onlyText")
      this.renderer.setProperty(this.ref.nativeElement,"disabled",false)
      this.renderer.setProperty(this.ref.nativeElement,"readOnly",true)
      this.upperCaseValue()
    }
    const sentenciaValueSave = this.cleanUnnecessary(this.ref.nativeElement.value.toLowerCase())!==this.cleanUnnecessary(this.id.toLowerCase())
    if(sentenciaValueSave){
      this.addSaveIcon()
    } else {
      this.deleteSaveIcon()
    }
  }
  addSaveIcon(){
    const refContain = this.renderer.parentNode(this.ref.nativeElement)
    const iconSave = this.renderer.createElement('fa-icon')
    this.renderer.setProperty(iconSave,"innerHTML",this.iconSave)
    this.renderer.addClass(iconSave,"faSave")
    this.renderer.setProperty(iconSave,"id",this.id+"Save")
    const idSave = document.getElementById(this.id+'Save')
    if(!idSave){
      this.clickSaveEdit = this.renderer.listen(iconSave,"click",(event)=>{
        this.deleteSaveIcon();
        this.saveInput.emit([this.ref.nativeElement.value.toLowerCase(),this.ref.nativeElement.id.split('-')[1]])
        this.id = this.cleanInputId(this.ref.nativeElement.value.toLowerCase())
      })
      this.renderer.appendChild(refContain,iconSave)
    }
  }
  deleteSaveIcon(){
    const refContain = this.renderer.parentNode(this.ref.nativeElement)
    const idSaveCondition = document.getElementById(this.id+'Save')
    if(idSaveCondition){
      this.clickSaveEdit();
      const idSave = this.renderer.selectRootElement('#'+this.id+'Save',true)
      this.renderer.removeChild(refContain,idSave)   
    }
  }
  @HostListener('blur',['$event'])
  blurItem(event:Event){
    this.renderer.addClass(this.ref.nativeElement,"onlyText")
    this.renderer.setProperty(this.ref.nativeElement,"disabled",false)
    this.renderer.setProperty(this.ref.nativeElement,"readOnly",true)
    this.renderer.setProperty(this.ref.nativeElement,"value",this.cleanUnnecessary(this.ref.nativeElement.value))
    this.upperCaseValue()
  }
  private editItem(){
    this.renderer.addClass(this.ref.nativeElement,"select-text")
    this.renderer.removeClass(this.ref.nativeElement,"onlyText")
    this.renderer.setProperty(this.ref.nativeElement,"readOnly",false)
    const item = this.ref.nativeElement
    const itemIcon = "<fa-icon (click)='deleteItem(item.name)' class='faMinus' *ngIf='editMode===true' [icon]='iconMinus'></fa-icon>"
    
  }
  private upperCaseValue(){
    const item = this.ref.nativeElement.value;
    const upperCase = this.cleanUnnecessaryWhiteSpaces(item.toUpperCase())
    this.renderer.setProperty(this.ref.nativeElement,"value",upperCase)
  }
  cleanUnnecessary(str:string){
    let name = this.cleanUnnecessaryWhiteSpaces(str);
    name = this.cleanInput(name);
    return name
  }
  cleanUnnecessaryWhiteSpaces(cadena: string){
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }
  cleanInput(str:string){
    return str.replace(/[^a-zA-Z0-9]/g," ")
  }
  cleanInputId(str:string){
    return str.replace(/[^a-zA-Z0-9]/g,"_")
  }
}
