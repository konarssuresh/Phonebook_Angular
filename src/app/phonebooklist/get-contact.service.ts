import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Contact } from 'src/app/phonebooklist/Contact';

@Injectable({
  providedIn: 'root'
})
export class GetContactService implements InMemoryDbService{
 
 
 
  createDb() {
    const contacts:Contact[]=[{id:1,phoneNumber:"9595392234",Name:"SamWell Tarly"},
                              {id:2,phoneNumber:"2342345676",Name:"Walsh Gibbins"},
                                {id:3,phoneNumber:"9876567895",Name:"Wes Keating"}];

  return {contacts};
  }

  constructor() { }
}
