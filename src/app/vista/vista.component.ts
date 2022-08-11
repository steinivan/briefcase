import { AfterContentChecked, AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
  public swiperPageCero:boolean=true;
  config: SwiperOptions = {
    direction:"vertical",
    autoHeight:true,
    preventInteractionOnTransition:true,
    keyboard:true,
    mousewheel:true,
    updateOnImagesReady:true,
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
  constructor() {}
  // icons

  // icons
  ngAfterContentChecked() {
    if(this.swiper){
      this.swiper.updateSwiper({});
    }
  }

  afterInitSwiper(){
    console.log(this.swiper.swiperRef.activeIndex);
  };

  ThisNext(){
    this.swiper.swiperRef.slideNext(1000)
  }
  onSwiper([swiper]:any) {
    console.log(swiper);
  }
  onSlideChange() {
    const page = this.swiper.swiperRef.activeIndex
    if(page===0){
      this.swiperPageCero = true;
    } else {
      this.swiperPageCero = false;
    }
  }
}