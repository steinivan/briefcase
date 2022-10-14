import { Component,ViewEncapsulation,AfterContentChecked,ViewChild, ElementRef,HostListener } from '@angular/core';
import {SwiperComponent} from 'swiper/angular'
import  {SwiperOptions} from 'swiper';
import SwiperCore,{Navigation,Pagination,Keyboard,Lazy,EffectCube} from 'swiper'
import {faReply,faShare} from '@fortawesome/free-solid-svg-icons'
import {ResizeService} from '../../service/BreakpointObserver/resize.service'
import { delay } from 'rxjs';
SwiperCore.use([Keyboard,Navigation,Lazy,Pagination,EffectCube])

@Component({
  selector: 'app-porfolio-proyects',
  templateUrl: './porfolio-proyects.component.html',
  styleUrls: ['./porfolio-proyects.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PorfolioProyectsComponent implements AfterContentChecked {
  @ViewChild('swiper') swiper:SwiperComponent;
  config: SwiperOptions = {
    autoHeight:true,
    preventInteractionOnTransition:true,
    keyboard:true,
    updateOnImagesReady:true,
    effect:'cube',
    cubeEffect: {
          slideShadows: false,
          shadow:false,
        },
    lazy: {
          loadPrevNext: true,
          loadPrevNextAmount:2,
        },
    preloadImages:true,
    speed:1000,
    slidesPerView:1,
    resistanceRatio:0,
    };
    public sizeDisplay:String;
    // icon
    changeViewIconI = faReply;
    changeViewIconR = faShare;
    // icon
    proyectName:String[]=["Coffe Proyect","BookFlix Proyect","Naruto Game Card Proyect","Shipland"];
    nameProyectI:String="Coffe Proyect";
  constructor(private ResService:ResizeService) {
    this.getResizeWindow()
   }
  
  ngAfterContentChecked(): void {
    if(this.swiper){
      this.swiper.updateSwiper({});
    }

  }
  @ViewChild('nextProyect') elRefNext: ElementRef; 
  @ViewChild('backProyect') elRefBack: ElementRef; 
  
  next(){
    this.swiper.swiperRef.slideNext(1000)
    
  }
  back(){
    this.swiper.swiperRef.slidePrev(1000)
    
  }
  @ViewChild('nameProyects') nameProyects:ElementRef;
  changeProyectSlide(){
    const index = this.swiper.swiperRef.activeIndex;
    if(index===0){
      this.elRefBack.nativeElement.classList.add("swiper-button-hidden")
    }
    if(index>0){
      this.elRefBack.nativeElement.classList.remove("swiper-button-hidden")
    }

    if(index===3){
      this.elRefNext.nativeElement.classList.add("swiper-button-hidden")
    }
    if(index<3){
      this.elRefNext.nativeElement.classList.remove("swiper-button-hidden")
    }
    setTimeout(()=>{
      this.nameProyects.nativeElement.innerHTML = this.proyectName[index];
    },800)
  }
  @HostListener('window:resize', ['$event'])
  getResizeWindow($event?:Event){
    this.sizeDisplay=this.ResService.sizeDisplay
  }
  conditionWebNarutoSize(){
    const size = window.innerWidth;
    if(size>=1000){
      return true;
    } else {
      return false;
    }
  }
  redirectPage(){
    const index = this.swiper.swiperRef.activeIndex;
    switch (index) {
      case 3:
        window.open('http://www.shiplandoficial.com/')
        break;
      case 2:
        window.open('https://benevolent-gelato-86c9d9.netlify.app')
        break;
      case 1:
        window.open('https://gentle-puffpuff-82fd3a.netlify.app')
        break;
      case 0:
        window.open('https://ivan-cafesite.netlify.app')
        break;
    
      default:
        break;
    }
  }
}
