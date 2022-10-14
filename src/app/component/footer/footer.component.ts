import { Component, HostListener, OnInit } from '@angular/core';
import { faCopyright, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from 'src/app/service/BreakpointObserver/resize.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  // icon
  iCopyRight = faCopyright;
  iEmail = faEnvelope;
  // icon
  public resizeType:String;
  public pixelBottom:number = 0;
  constructor(private resize:ResizeService) { }
  ngOnInit(): void {
    this.resizeType = this.resize.sizeDisplay;
    this.pixelBottom = this.resizeType === 'phone' ? 50 : 0;
  }
  @HostListener('window:resize', ['$event'])
  changeResize(event:Event){
    this.resizeType = this.resize.sizeDisplay;
    this.pixelBottom = this.resizeType === 'phone' ? 50 : 0;
  }

}
