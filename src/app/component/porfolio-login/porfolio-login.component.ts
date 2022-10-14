import { AfterViewInit, Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen,faXmark,faCirclePlus,faCircleCheck, faCircleMinus, faArrowLeft, faCamera,faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { catchError, tap } from 'rxjs';
import { CrudService } from 'src/app/service/CRUD/crud.service';
import { DataConditionService } from 'src/app/service/dataCondition/data-condition.service';
@Component({
  selector: 'app-porfolio-login',
  templateUrl: './porfolio-login.component.html',
  styleUrls: ['./porfolio-login.component.scss']
})
export class PorfolioLoginComponent implements OnInit,AfterViewInit {

  // icon
  iconEdit=faPen;
  iconX=faXmark;
  iconAdd=faCirclePlus;
  iconMinus=faCircleMinus;
  iSave=faCircleCheck;
  iBack = faArrowLeft;
  iCamera = faCamera;
  iEllipsis = faEllipsis
  // icon

  formulary:boolean;
  public FormSubmit:FormGroup = new FormGroup({});
  public formValidState:boolean=false;
  public errorMail:boolean=false;
  public errorPassword:boolean=false;
  constructor(private build:FormBuilder, private renderer:Renderer2,private router:Router,private crud:CrudService, private loginService:DataConditionService) {
    
   }
  
  ngOnInit(): void {
    this.FormSubmit = this.build.group({
      email: new FormControl (''),
      password: new FormControl (''),
    })
  }
  ngAfterViewInit(): void {
    
  }
  get fm(){
    return this.FormSubmit.controls
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object)?.values(formGroup.controls)?.forEach((control:any) => {
      if (control.controls) { // control is a FormGroup
        this.markFormGroupTouched(control);
      } else { // control is a FormControl
        control?.markAsTouched();
        control?.updateValueAndValidity({ onlySelf: true })
      }
    });
    }
  back(){
    this.router.navigate(['/inicio'])
  }
  formIf(type:string){
    const condition = ((this.fm[type].dirty || this.fm[type].touched || this.fm[type].pristine) && this.fm[type].errors && this.formValidState);
    return condition
  }

  submitForm(value:any){
    if(this.FormSubmit.valid){
      const json = JSON.stringify(this.FormSubmit.value)
      const eso = this.crud.login(this.FormSubmit.value).subscribe(
        res => {
          this.errorMail=false;
          this.errorPassword=false;
          this.loginService.signIn();
          
        },
        err => {
          if(err.error === "email invalid"){
            this.errorPassword=false;
            this.errorMail=true
          }
          if(err.error === "password invalid"){
            this.errorMail=false;
            this.errorPassword=true
          }
        },
        () => {
          this.back();
        }
        );
      
      this.FormSubmit.reset();
    } else {
      this.formValidState = true;
      return
      
    }
  }
}
