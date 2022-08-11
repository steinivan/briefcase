import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-porfolio-data',
  templateUrl: './porfolio-data.component.html',
  styleUrls: ['./porfolio-data.component.scss']
})
export class PorfolioDataComponent implements AfterViewInit, OnChanges {
  public occupation:String[]=['Full Stack Developer','FrontEnd ANGULAR','BackEnd JAVA']
  public indexOccupation:number = 0;
  public lengthOccupation:number;
  public intervalIDadd:any;
@Input() mt:number = 0;
constructor() { }
@ViewChild('occupationP') textOcuppation: ElementRef;
@Input() set swiperPageCero(value:boolean){
  if(value && this.textOcuppation!==undefined){
    if(this.lengthOccupation!==0){
      this.animateTypedOccupedDelete(value)
    } else {
      clearInterval(this.intervalIDadd);
      
      // this.animateTypedOccupedAdd(value)
    }
  } else { return }
}
  ngAfterViewInit(): void {
    this.intervalIDadd =  setInterval(()=>{
      this.animateTypedOccupedDelete(true)
    },500)
    console.log("esto debio ser solo 1")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("chang")
  }

  animateTypedOccupedDelete(page:boolean){
    const text = this.textOcuppation.nativeElement.innerText;
    if(page){
        const textNow = this.textOcuppation.nativeElement.innerText
        const textArray = textNow.substring(0, text.length - 1);
        console.log(textNow,textArray)
          console.log("letra menos")
          this.lengthOccupation=text.length - 1;
          this.textOcuppation.nativeElement.innerText = textArray
      } else { return }
  }

}
