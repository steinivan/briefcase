import { Component,ViewEncapsulation,AfterContentChecked,ViewChild, ElementRef,HostListener } from '@angular/core';
import {SwiperComponent} from 'swiper/angular'
import  {SwiperOptions} from 'swiper';
import SwiperCore,{Navigation,Pagination,Keyboard,Lazy,EffectCube} from 'swiper'
import {faReply,faShare} from '@fortawesome/free-solid-svg-icons'
import {ResizeService} from '../../service/BreakpointObserver/resize.service'
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
  changeProyectSlide(){
    if(this.swiper.swiperRef.activeIndex===0){
      this.elRefBack.nativeElement.classList.add("swiper-button-hidden")
    }
    if(this.swiper.swiperRef.activeIndex>0){
      this.elRefBack.nativeElement.classList.remove("swiper-button-hidden")
    }

    if(this.swiper.swiperRef.activeIndex===3){
      this.elRefNext.nativeElement.classList.add("swiper-button-hidden")
    }
    if(this.swiper.swiperRef.activeIndex<3){
      this.elRefNext.nativeElement.classList.remove("swiper-button-hidden")
    }
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
  redirectPage(page:String){
    switch (page) {
      case 'shipland':
        window.open('http://www.shiplandoficial.com/')
        break;
      case 'naruto':
        window.open('https://benevolent-gelato-86c9d9.netlify.app')
        break;
      case 'bookflix':
        window.open('https://gentle-puffpuff-82fd3a.netlify.app')
        break;
      case 'coffe':
        window.open('https://ivan-cafesite.netlify.app')
        break;
    
      default:
        break;
    }
  }
}
