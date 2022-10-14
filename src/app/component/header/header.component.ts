import {  Component, EventEmitter, OnInit, Output, Renderer2, Input } from '@angular/core';
import { faArrowRightFromBracket, faBars, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataConditionService } from 'src/app/service/dataCondition/data-condition.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // icons
  iBar = faBars;
  iCross = faXmark;
  iUser = faUser;
  iOut = faArrowRightFromBracket;
  // icons
  public dropdown:boolean=false;
  public loginCheck:boolean;
  public subscribeLogin:Subscription;
  
  constructor(private renderer:Renderer2,private loginService:DataConditionService ) { }
  @Output() indexPage = new EventEmitter<String>();
  @Input() login:boolean;

  ngOnInit() {
  }

  logOut(){
    this.loginService.logOut();
  }
  outputIndex(event:String,state:string){
    if(state==='movil'){
      this.changeDropdown()
    } else { 
      const dropdown = this.renderer.selectRootElement('.nav-dropdown',true)
      const iconBar = this.renderer.selectRootElement('.iconBar',true)
      dropdown.classList.remove('openDropDown')
      iconBar.classList.remove('iconDropdown')
    }
    this.indexPage.emit(event);
  }
  
  changeDropdown(){
    const dropdown = this.renderer.selectRootElement('.nav-dropdown',true)
    const iconBar = this.renderer.selectRootElement('.iconBar',true)
    dropdown.classList.toggle('openDropDown')
    iconBar.classList.toggle('iconDropdown')
  }

}
