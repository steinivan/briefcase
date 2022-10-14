import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingAppModule } from './routing-app/routing-app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PorfolioDataComponent } from './component/porfolio-data/porfolio-data.component';
import { VistaComponent } from './vista/vista.component';
import { HeaderComponent } from './component/header/header.component';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { PorfolioDescriptionComponent } from './component/porfolio-description/porfolio-description.component';
import { PorfolioServiceComponent } from './component/porfolio-service/porfolio-service.component';
import { PorfolioProyectsComponent } from './component/porfolio-proyects/porfolio-proyects.component';
import { PorfolioContactComponent } from './component/porfolio-contact/porfolio-contact.component';
import { EditTextDirective } from './directive/edit-text.directive';
import { CreateElementDirective } from './directive/create-element.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { PorfolioLoginComponent } from './component/porfolio-login/porfolio-login.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerModule } from './component/spinner/spinner.module';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    PorfolioDataComponent,
    VistaComponent,
    HeaderComponent,
    PorfolioDescriptionComponent,
    PorfolioServiceComponent,
    PorfolioProyectsComponent,
    PorfolioContactComponent,
    EditTextDirective,
    CreateElementDirective,
    FooterComponent,
    PorfolioLoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingAppModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule,
    NoopAnimationsModule,
    FormsModule, ReactiveFormsModule,
    SpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
