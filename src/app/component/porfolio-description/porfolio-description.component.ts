import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/service/CRUD/crud.service';

@Component({
  selector: 'app-porfolio-description',
  templateUrl: './porfolio-description.component.html',
  styleUrls: ['./porfolio-description.component.scss']
})
export class PorfolioDescriptionComponent implements AfterViewInit, OnInit {
  constructor(private crudService:CrudService) { }

  ngOnInit():void{
  }
  ngAfterViewInit(): void {
  }

}
