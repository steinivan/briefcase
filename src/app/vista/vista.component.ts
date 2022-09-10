import { AfterContentChecked, AfterViewInit, Component, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import {SwiperComponent} from 'swiper/angular'
import  { SwiperOptions} from 'swiper';
import SwiperCore,{Pagination,Mousewheel,Keyboard,Lazy} from 'swiper'
SwiperCore.use([Pagination,Mousewheel,Keyboard,Lazy])
@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class VistaComponent implements AfterContentChecked {
  @ViewChild('swiper') swiper:SwiperComponent;
  config: SwiperOptions = {
    shortSwipes:false,
    longSwipesRatio:0.1,
    direction:"vertical",
    autoHeight:true,
    preventInteractionOnTransition:true,
    keyboard:true,
    mousewheel:false,
    updateOnImagesReady:true,
    initialSlide:0,
    lazy: {
          loadPrevNext: true,
          loadPrevNextAmount:2,
        },
    preloadImages:true,
    speed:1000,
    slidesPerView:1,
    pagination: {
      clickable:true
    },
    resistanceRatio:0,
    };
    
  constructor() {
    
  }
  // icons

  // icons
  ngAfterContentChecked() {
    // if(this.swiper){
    //   this.swiper.updateSwiper({});
    // }
  }
  @HostListener('window:scroll',['$event'])
  scrollListener(event:Event){
    console.log(event)
  }
  afterInitSwiper(){
    console.log(this.swiper.swiperRef.activeIndex);
  };
  changeIndexPage(event:String){
    switch (event) {
      case 'index':
        this.swiper.swiperRef.slideTo(0)
        break;
      case 'aboutMe':
        this.swiper.swiperRef.slideTo(1)
        break;
      case 'service':
        this.swiper.swiperRef.slideTo(2)
        break;
      case 'projects':
        this.swiper.swiperRef.slideTo(3)
        break;
      case 'contact':
        this.swiper.swiperRef.slideTo(4)
        break;
      default:
        break;
    }
  }
  ThisNext(){
    this.swiper.swiperRef.slideNext(1000)
  }
  onSwiper([swiper]:any) {
    console.log(swiper);
  }
  onSlideChange() {
    
  }
}