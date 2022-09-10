import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,AfterViewInit {

  // icons
  iBar = faBars;
  iCross = faXmark;
  // icons
  public dropdown:boolean=false
  constructor(private renderer:Renderer2) { }
  @Output() indexPage = new EventEmitter<String>();
  ngOnInit(): void {
  }
  ngAfterViewInit(){
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
    // this.dropdown = !this.dropdown;
    // this.dropdown = true;
  }


}
