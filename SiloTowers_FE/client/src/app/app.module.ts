import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppComponent } from './app.component';
import { TowerComponent } from './components/tower.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TowerService } from './services/tower.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ValidatorsService } from './services/validators.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUrlInterceptor, API_URL } from './interceptors/api-url-interceptor';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TowerComponent
  ],
  imports: [
    BrowserModule,
    NzGridModule,
    NzIconModule,
    FontAwesomeModule ,
    HttpClientModule,
    NzModalModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzFormModule ,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TowerService,
    ValidatorsService,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
