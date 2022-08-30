import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { DataConditionService } from '../service/dataCondition/data-condition.service';

@Directive({
  selector: '[appEditText]'
})
export class EditTextDirective implements AfterViewInit,OnChanges{
  private clickCount = 0;
  private id:string;
  private type:string;
  @Output() saveInput:EventEmitter<string> = new EventEmitter<string>();
  constructor(private renderer:Renderer2,private ref:ElementRef, private saveStatus:DataConditionService) {
  }
  private status:boolean;
  
  @Input() set appEditText(status:string) {
    this.status = status===this.id?true:false;
    this.conditionStatus()
  }
  ngOnChanges():void{
    this.saveStatus.saveOrNotChange.subscribe(item=>{
      if(!this.status){return}
      const idItem = this.cleanInput(this.ref.nativeElement.id.split('-')[1])
      if(item){
        this.saveInput.emit(this.ref.nativeElement.value.toLowerCase())
      } else {
        this.renderer.setProperty(this.ref.nativeElement,"value",idItem.toUpperCase())
      }
    })
  }
  cleanInput(str:string){
    return str.replace(/[^a-zA-Z0-9]/g," ")
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
    this.id = this.renderer.parentNode(item).classList[0].split('-')[1]
  }
  @HostListener("click" , ['$event'])
  private click($event:Event) {
    this.clickCount++;
    setTimeout(() => {
        if (this.clickCount === 1) {
        } else if (this.clickCount === 2) {
          console.log("dos click")
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
  }
  @HostListener('blur',['$event'])
  blurItem(event:Event){
    this.renderer.addClass(this.ref.nativeElement,"onlyText")
    this.renderer.setProperty(this.ref.nativeElement,"disabled",false)
    this.renderer.setProperty(this.ref.nativeElement,"readOnly",true)
    this.upperCaseValue()
  }
  private editItem(){
    this.renderer.addClass(this.ref.nativeElement,"select-text")
    this.renderer.removeClass(this.ref.nativeElement,"onlyText")
    this.renderer.setProperty(this.ref.nativeElement,"readOnly",false)
    console.log("llego a clci")
    const item = this.ref.nativeElement
    const itemIcon = "<fa-icon (click)='deleteItem(item.name)' class='faMinus' *ngIf='editMode===true' [icon]='iconMinus'></fa-icon>"
    
  }
  private upperCaseValue(){
    const item = this.ref.nativeElement.value;
    const upperCase = this.cleanUnnecessaryWhiteSpaces(item.toUpperCase())
    this.renderer.setProperty(this.ref.nativeElement,"value",upperCase)
  }
  cleanUnnecessaryWhiteSpaces(cadena: string){
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }
}