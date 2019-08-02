import { Component, OnInit } from '@angular/core';
import { GetContactService } from 'src/app/phonebooklist/get-contact.service';
import { Contact } from 'src/app/phonebooklist/Contact';
import { ContactsService } from 'src/app/phonebooklist/contacts.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-phonebooklist',
  templateUrl: './phonebooklist.component.html',
  styleUrls: ['./phonebooklist.component.css']
})
export class PhonebooklistComponent implements OnInit {

  @Input() set filterText(value:string){
    if(value==undefined || value==""){
      this.contactsTempVal=this.contacts;
    }
    else{
      this.contactsTempVal=this.contacts.filter(function(Contact){
        console.log(Contact.Name.toLowerCase().search(value.toLowerCase()) != -1);
        return Contact.Name.toLowerCase().search(value.toLowerCase()) != -1;


      });
    }
  }

  filterTextVal:string;
  contactsTempVal:Contact[];
  contacts:Contact[];
  errorMsg:any;
  contact:Contact={id:0,Name:"",phoneNumber:""};
  AlreadyExistsErrorMsg:string;

  constructor(private ContactService:ContactsService) { }

  ngOnInit() {
    this.ContactService.getContacts().subscribe(contacts => {this.contacts=contacts; this.contactsTempVal=this.contacts;} ,err => this.errorMsg=<any>err)
  }

  deleteContact(id:number){
    this.ContactService.deleteContact(id);
    this.contacts=this.contacts.filter((contact)=>{
      if(contact.id != id){
        console.log(id);
        return true;
      }
    });
    this.contactsTempVal=this.contacts;
  }

  addContactValuesInEntry(contact:Contact){
    this.contact.Name=contact.Name;
    this.contact.phoneNumber=contact.phoneNumber;
  }

  onSubmit(){
    if(this.contacts.filter((contact)=>{
      return (contact.Name.toLowerCase().search(this.contact.Name.toLowerCase()) != -1 );
    }).length==0){
      this.AlreadyExistsErrorMsg=null;
      var contactToAdd=new Contact();
      contactToAdd.Name=this.contact.Name;
      contactToAdd.phoneNumber=this.contact.phoneNumber;
      this.ContactService.addContact(contactToAdd).subscribe(data=>{this.contacts.push(data);this.contactsTempVal=this.contacts});
      this.ContactService.getContacts().subscribe((data) => console.log(data));
    }else{
     this.contacts.forEach((contact)=>{
       if(contact.Name.toLowerCase()===this.contact.Name.toLowerCase()){
         contact.phoneNumber=this.contact.phoneNumber;
         this.ContactService.updateContact(contact);
       }
     })
    }
  }
}
