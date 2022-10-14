import { AfterContentChecked, AfterViewInit, Component, HostListener, ViewChild, ViewEncapsulation, OnDestroy, OnInit,ElementRef } from '@angular/core';
import {SwiperComponent} from 'swiper/angular'
import  { SwiperOptions} from 'swiper';
import SwiperCore,{Pagination,Mousewheel,Keyboard,Lazy} from 'swiper'
import { Route, Router } from '@angular/router';
import { Observable, Subject, Subscription,fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DataConditionService } from '../service/dataCondition/data-condition.service';
import { ResizeService } from '../service/BreakpointObserver/resize.service';
SwiperCore.use([Pagination,Mousewheel,Keyboard,Lazy])
@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class VistaComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('swiper') swiper:SwiperComponent;
  config: SwiperOptions = {
    shortSwipes:true,
    longSwipesRatio:0.2,
    direction:"vertical",
    autoHeight:true,
    preventInteractionOnTransition:true,
    keyboard:true,
    mousewheel:false,
    updateOnImagesReady:true,
    threshold:90,
    initialSlide:0,
    lazy: {
          loadPrevNext: true,
          loadPrevNextAmount:1,
        },
    preloadImages:false,
    speed:1000,
    slidesPerView:1,
    pagination: {
      clickable:true
    },
    resistanceRatio:0,
    };
    public login:boolean;
    public subscribeLogin:Subscription;
    public resize:String;
  constructor(private route:Router, private loginService:DataConditionService, private reService:ResizeService) {
    
  }
  // icons

  // icons
  ngOnInit(): void {
    this.subscribeLogin = this.loginService.currentUser.subscribe(val => this.login = val);
  }

  
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.subscribeLogin.unsubscribe();
  }
  afterInitSwiper(){
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
      case 'login':
        this.route.navigate(['/login']);
        break;
      default:
        break;
    }
  }
  


  ThisNext(){
    this.swiper.swiperRef.slideNext(1000)
  }
  onSwiper([swiper]:any) {
  }
  onSlideChange() {
  }
}