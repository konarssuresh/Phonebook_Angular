import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/app/phonebooklist/Contact';
import { Observable } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { HttpHeaders } from '@angular/common/http';
import { concat } from 'rxjs/internal/operators/concat';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }

  private contactsUrl="api/contacts";

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap(data => console.log("all "+ JSON.stringify(data)))
      ,catchError(this.handleError)
    )
  }

  addContact(contact:Contact):Observable<Contact>{

    let options = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post<Contact>(this.contactsUrl,contact,{headers:options}).pipe(
      tap(data => console.log("all "+ JSON.stringify(data)))
    )

  }

  updateContact(contact:Contact):Observable<Contact>{
    let options=new HttpHeaders({"Content-Type":"application/json"});
    return this.http.put<Contact>(this.contactsUrl,contact,{headers:options}).pipe(
      tap(data => console.log("updated contact "+data.Name))
    )
  }

  deleteContact(id:number){
    let url=this.contactsUrl+"/"+id;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    )
  }



  handleError(err:HttpErrorResponse){

    let errMsg:string;
    if(err.error instanceof Error){
      console.log('An error occurred:', err.error.message);
       errMsg = err.error.message;
    }else{
      console.log("Backend returned code of "+err.status);
      errMsg=err.statusText;
      console.log("err status"+errMsg);
    }

    return Observable.throw(errMsg);

  }


}
