import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-porfolio-data',
  templateUrl: './porfolio-data.component.html',
  styleUrls: ['./porfolio-data.component.scss']
})
export class PorfolioDataComponent implements AfterViewInit {
  public occupation:String[]=['Full Stack Developer','FrontEnd ANGULAR','BackEnd JAVA']
  public swiperPageCeroBoolean:boolean=true;
  public indexOccupation:number = -1;
  public lengthOccupation:number=0;
  public intervalIDadd:any;
  public intervalIDdelete:any;
  @Input() mt:number = 0;
  constructor() { }
  @ViewChild('occupationP') textOcuppation: ElementRef;
  @Input() set swiperPageCero(value:boolean){
    this.swiperPageCeroBoolean=value;
    if(value && this.textOcuppation!==undefined){
      this.toDisableAnimate();
      this.tellAnimationTyped();
    } else { 
        this.toDisableAnimate();
      return 
    }
  }

  ngAfterViewInit(): void {
    this.tellAnimationTyped();
  }

  tellAnimationTyped(){
    if(this.lengthOccupation>0){
      setTimeout(()=>{
        this.animateTypedOccupedDelete()
      },1000)
    } else {
      setTimeout(()=>{
        this.animateTypedOccupedAdd()
      },2000)
    }
  }
  toDisableAnimate(){
    this.indexOccupation = -1;
    this.lengthOccupation = 0;
    clearInterval(this.intervalIDadd)
    clearInterval(this.intervalIDdelete)
    if(this.textOcuppation){
      setTimeout(()=>{
        this.textOcuppation.nativeElement.innerHTML = "";
      },500)
    }
  }
  animateTypedOccupedDelete(){
    this.intervalIDdelete =  setInterval(()=>{
      const text = this.textOcuppation.nativeElement.innerText;
      if(!this.swiperPageCeroBoolean){this.toDisableAnimate();return}
      if(this.lengthOccupation===0){
      clearInterval(this.intervalIDdelete);
      setTimeout(()=>{
        this.animateTypedOccupedAdd()
      },1000)
      return
      }
      const textNow = this.textOcuppation.nativeElement.innerText
      const textArray = textNow.substring(0, text.length - 1);
      this.lengthOccupation=text.length - 1;
      this.textOcuppation.nativeElement.innerText = textArray
    },25)
  }
  animateTypedOccupedAdd(){
    this.intervalIDadd = setInterval(()=>{
      const textNow = this.textOcuppation.nativeElement.innerText
      if(!this.swiperPageCeroBoolean){this.toDisableAnimate()}
      if(this.indexOccupation===2)this.indexOccupation=-1;
      const textSig = this.occupation[this.indexOccupation+1]
      let textReduce = textSig.substring( 0,   (textSig.length - (textSig.length - (textNow.length+1) ) ) );
      if(' ' === textSig.substring(textReduce.length-1,textReduce.length)){
        textReduce+= textSig.substring(textReduce.length,textReduce.length+1)
      }
      this.textOcuppation.nativeElement.innerText = textReduce;
      if(textNow===textSig){
        clearInterval(this.intervalIDadd);
        this.indexOccupation++
        this.lengthOccupation=textNow.length
        setTimeout(()=>{
          this.animateTypedOccupedDelete()
        },2500)
      }
    },25)
  }

}
