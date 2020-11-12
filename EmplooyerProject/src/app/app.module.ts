import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { FormempComponent } from './formemp/formemp.component';
import { ListempComponent } from './listemp/listemp.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FormempComponent,
    BodyComponent,
    ListempComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot( {
      timeOut : 5000,
      positionClass: 'toast-top-right',
      preventDuplicates : false
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
