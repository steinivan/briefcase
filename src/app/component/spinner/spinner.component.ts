import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div *ngIf="isLoading$ | async" class="spinnerInter">
    <div class="lds-spinner" >
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent{
  isLoading$ = this.spinnerSvc.isLoading$;
  constructor(private spinnerSvc:SpinnerService) { 
  }
}
