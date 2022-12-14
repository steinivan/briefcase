import {  AfterViewInit,AfterContentInit ,EventEmitter, Component, ElementRef, Input, Output , OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild,  } from '@angular/core';
import { CrudService } from '../../service/CRUD/crud.service'
import { faPen,faXmark,faCirclePlus,faCircleCheck, faCircleMinus, } from '@fortawesome/free-solid-svg-icons';
import { type,language } from 'src/app/model/models';
import { keyClass } from './interface';
import SwiperCore,{Pagination,Mousewheel,Keyboard,Lazy,Scrollbar} from 'swiper'
import {SwiperComponent} from 'swiper/angular'
import { Observable } from 'rxjs';

SwiperCore.use([Pagination,Mousewheel,Keyboard,Lazy,Scrollbar])

@Component({
  selector: 'app-porfolio-data',
  templateUrl: './porfolio-data.component.html',
  styleUrls: ['./porfolio-data.component.scss']
})
export class PorfolioDataComponent implements OnInit,OnChanges, AfterViewInit{
  

  public editMode:boolean=false;
  public addON:string='';

  public listType:type[];
  public listLanguage:language[];
  public otherList:language[]=[];
  public webList:language[]=[];
  public frameList:language[]=[];
  public typeId:type[];
  
  @Input() AcountAdmin:boolean;
  public listTypeLanguage:any=[this.webList,this.frameList,this.otherList]
  // icon
  iconEdit=faPen;
  iconX=faXmark;
  iconAdd=faCirclePlus;
  iconMinus=faCircleMinus;
  iSave=faCircleCheck;
  // icon
  
  constructor(private crudService:CrudService,private renderer:Renderer2, elementR:ElementRef) { 
  }
  @ViewChild('swiper') swiper:SwiperComponent;
  ngOnInit():void{
  }
  initListType(){
    this.crudService.getType().subscribe(element=>{this.listType = element})
    this.crudService.getLanguage().subscribe(element=>{
      this.listLanguage = element;
      this.orderList()
    })
  }
  ngAfterViewInit():void{
    this.initListType()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.orderList()
  }
  UppercaseOneLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  clickCount = 0;
  click(nameF:string,value:any) {
    const element:keyClass = {
      "edit" : this.itemEdit,
    }
    this.clickCount++;
    setTimeout(() => {
        if (this.clickCount === 1) {

        } else if (this.clickCount === 2) {
          element[nameF](value)
        }
        this.clickCount = 0;
    }, 250)
}

  cleanInput(str:string){
    return str.replace(/[^a-zA-Z0-9]/g," ")
  }
  cleanInputId(str:string){
    return str.replace(/[^a-zA-Z0-9]/g,"_")
  }
  orderList(): void {
    if(this.listLanguage){
      this.otherList = []
      this.webList = []
      this.frameList = []
      this.listLanguage.forEach(element=>{
        if(element.type?.toLowerCase()==="web"){
          this.webList.push(element)
        }
        if(element.type?.toLowerCase()==="frame"){
          this.frameList.push(element)
        }
        if(element.type?.toLowerCase()==="other"){
          this.otherList.push(element)
        }
      })
    }
  }
  itemEdit(event:any){
    this.addON=event;
  }
  saveItem(event:any){
    this.addItemList(event.type,event.name)
  }
  saveEditItem(event:any){
    this.listLanguage.forEach(elem=>{
      if( this.cleanInput(elem.name.toLowerCase()) === this.cleanInput(event[1].toLowerCase())){
        elem.name = event[0]
        this.crudService.editLanguage(elem).subscribe()
      }
    })
  }
    addItem(name:string):void{
      const oneLetter = this.UppercaseOneLetter(name)
      const inputS = document.getElementById('inputSkill'+ oneLetter)
      
    }

    addItemList(name:string,value:string){
      const Element:keyClass = {
        "web" : this.webList,
        "frame" : this.frameList,
        "other" : this.otherList
      }
      const item = value.replace(' ',"")
      if(item.length>1){
        this.crudService.getType().subscribe(data => {
          const dataType = data.filter(elem=>{return elem.name.toLowerCase()===name.toLowerCase()});
          this.crudService.postLanguage({"name":value},dataType[0].id).subscribe(d => Element[name].push({id:d.id,name:d.name,type:d.type}))
        });
        
      }
    }

    moveList(name:string,mat:string){
      let opeMat:number
      if(mat==='suma'){opeMat = +1} else {opeMat = -1}
      const classSk:keyClass = {
        "web" : "section-presentation-skills-colWeb",
        "frame" : "section-presentation-skills-colFrame",
        "other" : "section-presentation-skills-colOther"
      }
      const list = document.getElementsByClassName(classSk[name])
      Array.from(list).forEach(a=>{
        const listRow = a.classList[1]
        a.classList.remove(listRow)
        const numList = Number(listRow[listRow.length-1]) + opeMat
        const rowClass = listRow.replace(listRow[listRow.length-1],numList.toString())
        a.classList.add(rowClass)
      })
    }

    deleteItem(name:string){
      const Element:keyClass = {
        "web" : this.webList,
        "frame" : this.frameList,
        "other" : this.otherList
      }
      const item = document.getElementById(name.toLowerCase())
      this.listLanguage.forEach((elem,index) => {
        if(elem.name===name){
          this.listLanguage.splice(index,1)
        }
      })
      if(item){
        const nameItem = item?.classList[0].split('-')[1]
        Element[nameItem].forEach((element:any,index:any) => {
          if(element.name.toLowerCase()===name.toLowerCase())
            Element[nameItem].splice(index,1)
        });
      }
      this.crudService.getLanguage().subscribe(data => {
        const dataLanguage = data.filter(elem=>{return elem.name.toLowerCase()===this.cleanInput(name.toLowerCase())});
        this.crudService.deleteLanguage(dataLanguage[0]).subscribe()
      });
    }
  changeEdit(){
    this.editMode = !this.editMode;
  }

}
