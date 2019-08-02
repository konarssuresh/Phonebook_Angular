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

  onSubmit(){
    if(this.contacts.filter((contact)=>{
      return contact.Name.search(this.contact.Name) != -1;
    }).length==0){
      this.AlreadyExistsErrorMsg=null;
      var contactToAdd=new Contact();
      contactToAdd.Name=this.contact.Name;
      contactToAdd.phoneNumber=this.contact.phoneNumber;
      this.ContactService.addContact(contactToAdd).subscribe(data=>{this.contacts.push(data);this.contactsTempVal=this.contacts});
    }else{
     this.AlreadyExistsErrorMsg= "this contact already exists";
    }
  }
}
