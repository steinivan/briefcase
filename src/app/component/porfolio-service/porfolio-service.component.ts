import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {faArrowTurnDown} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-porfolio-service',
  templateUrl: './porfolio-service.component.html',
  styleUrls: ['./porfolio-service.component.scss']
})
export class PorfolioServiceComponent implements OnInit {
  // icon
      IconArrowRightDown = faArrowTurnDown;
  // icon
  constructor() { }
  @Output() next = new EventEmitter<String>();
  ngOnInit(): void {
  }
  ThisNext(){
    this.next.emit('Page next')
  }
}
