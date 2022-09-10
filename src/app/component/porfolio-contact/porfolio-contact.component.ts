import { AfterViewInit, Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { faPen,faXmark,faCirclePlus,faCircleCheck, faCircleMinus, faArrowLeft, faCamera,faEllipsis } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-porfolio-contact',
  templateUrl: './porfolio-contact.component.html',
  styleUrls: ['./porfolio-contact.component.scss']
})
export class PorfolioContactComponent implements OnInit,AfterViewInit {

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
  formUpImg:boolean=false;
  public FormSubmit:FormGroup = new FormGroup({});
  public formValidState:boolean=false;
  public stateFormUpImage:boolean=false;
  constructor(private build:FormBuilder, private renderer:Renderer2) {
    
   }
  
  ngOnInit(): void {
    this.formState(false);
    this.FormSubmit = this.build.group({
      name: new FormControl ('',[Validators.required,Validators.minLength(2)]),
      email: new FormControl ('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phone:new FormControl (''),
      message:new FormControl (),
    })
  }
  ngAfterViewInit(): void {
    
  }
  get fm(){
    return this.FormSubmit.controls
  }
  public getError(controlName: string): string {
    let error = '';
    const control = this.FormSubmit.get(controlName);
    if ((control?.dirty ||control?.touched || control?.pristine) && control?.errors ) {
      switch(controlName){
        case('email'):
        if(control.errors?.["optionalPhoneEmail"]) error = "Debe ingresar un telefono o email"
        if(control?.errors?.['pattern']) error = "porfavor ingrese un correo valido"
        break
        case('name'):
        if(control.errors?.["minlength"]) error = "El nombre debe tener mas de 2"
        if(control?.errors["required"]) error = "requerido"
        break
        case('phone'):
        if(control.errors?.["optionalPhoneEmail"]) error = "Debe ingresar un telefono o email"
        break
      }
    }
    
    return error;
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
  formState(state:boolean){
    this.formulary = state;
  }
  formIf(type:string){
    const condition = ((this.fm[type].dirty || this.fm[type].touched || this.fm[type].pristine) && this.fm[type].errors && this.formValidState);
    return condition
  }
  private emailOrPhone(){
    const phone = this.FormSubmit.controls['phone'];
    const email = this.FormSubmit.controls['email'];

    if(email?.value !== '' || phone?.value !== '') { 
      this.removeError(email,'optionalPhoneEmail')
      this.removeError(phone,'optionalPhoneEmail')
    } else {
      this.FormSubmit?.get('email')?.setErrors({ optionalPhoneEmail: true })
      this.FormSubmit?.get('phone')?.setErrors({ optionalPhoneEmail: true })
    }
    return email?.value !== '' || phone?.value !== '' ? true : false;
  }
  private removeError(control: AbstractControl, error: string) {
    const err = control.errors; // get control errors
    if (err) {
      delete err[error]; // delete your own error
      if (!Object.keys(err).length) { // if no errors left
        control.setErrors(null); // set control errors to null making it VALID
      } else {
        control.setErrors(err); // controls got other errors so set them back
      }
    }
  }
  @ViewChild('iconCamera') iconCamera:ElementRef;
  upImage(state:string){
    if(state==='input'){
      this.formUpImg = true;
    } else { 

      this.formUpImg = false;
    }
  }
  updateImage(event:Event){
    const inputFile = this.renderer.selectRootElement("#inputFile",true)
    console.log(event,inputFile.files)
  }
  changeF(event:Event){
    const file = this.renderer.selectRootElement('#inputFile',true).files
    const image = this.renderer.selectRootElement('#imagePrevisualizacion',true)
    if (!file || !file.length) {
      image.src = "";
      return;
    }
    const fileOne = file[0]
    const objectUrl = URL.createObjectURL(fileOne)
    image.src = objectUrl;
  }
  submitForm(value:any){
    const emailCondition = this.emailOrPhone();
    if(this.FormSubmit.valid && emailCondition){
      const json = JSON.stringify(this.FormSubmit.value)
      this.FormSubmit.reset();
      this.formState(false)
    } else {
      this.formValidState = true;
      return
      
    }
  }
}
