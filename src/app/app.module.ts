import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhonebooklistComponent } from './phonebooklist/phonebooklist.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GetContactService } from 'src/app/phonebooklist/get-contact.service';
import { ContactsService } from 'src/app/phonebooklist/contacts.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhonebooklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(GetContactService),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ContactsService,GetContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
