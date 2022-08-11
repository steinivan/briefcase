import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

public sizeDisplay: string = 'phone' || 'web';
constructor(
    public breakpointObserver: BreakpointObserver
  ){
      this.mediaQuery();
  }
public mediaQuery() {
    this.breakpointObserver
    .observe('(max-width:700px)')
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
        this.sizeDisplay = 'phone';
        
    }
  });

  this.breakpointObserver
  .observe(['(min-width:700px)'])
  .subscribe((state: BreakpointState) => {
    if (state.matches) {
      this.sizeDisplay = 'web';
    }
  });
  }
}
