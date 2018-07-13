import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CONTACTS } from '../models/contact-list';
import { Contact } from '../models/contact';
import { ContactService } from '../contact.service';
@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: any = [];
  statusCode: number;
  requestProcessing = false;
  contactIdToUpdate = null;
  processValidation = false;

   //Create form
   contactForm = new FormGroup({
  
});
  public contact = new Contact();
  public selectedContact : Contact;
  title :string;
  id: number;  
  firstName: string = "";  
  lastName:string = "";
  email:string = "";
  phoneNumber:number;
  isNewContat:boolean;
  
  
  @ViewChild('closeBtn') closeBtn: ElementRef;
  heroForm: FormGroup;
  constructor(private contactService: ContactService, private fb: FormBuilder) {
     this.createForm();
   }
  ngOnInit() {
    this.getContacts();
  }
  createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required ],
      lname: ['', Validators.required ],
      emailId: ['', Validators.required ],
      pnumber:[''],
    });

    // this.contactForm = new FormGroup({
    //   'name': new FormControl(this.contacts.name, [
    //     Validators.required
    //   ])
    // });
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(
        data => this.contacts = data,
        errorCode =>  this.statusCode = errorCode);
  }

  // onSelect(email : string){
  //   this.contactService.getContact(email)
  //      .subscribe(res => 
  //     {
  //       debugger;
  //       this.selectedContact = res;
  //     })
  // }
  deleteContact(contactEmail) {
    const index: number = this.contacts.findIndex(contact => contact.email == contactEmail);
    if (index !== -1) {
        this.contacts.splice(index, 1);
    }        
}
editContact(id)
{
  debugger;
  this.title = "Edit";
  this.isNewContat = false;
  this.id = id;
  this.contactService.getContact(id)
  .subscribe(res => 
 {
   debugger;
   this.contact = res;
   this.firstName = this.contact.firstName;
   this.lastName = this.contact.lastName;
   this.email = this.contact.email;
   this.phoneNumber = this.contact.phoneNumber;
 })
}

addContact()
{
  this.isNewContat= true;
  this.title = "Add";
  this.contact = new Contact();
  this.firstName="";
  this.lastName="";
  this.email="";
  this.phoneNumber= null;
  
}
saveContact()
{

  if (this.contactForm.valid) {
    console.log('form submitted');
    if(!this.isNewContat)
      {
        for (var i = 0; i < this.contacts.length; i++) {
          if(this.contacts[i].email == this.email)
            {
              this.setData();
              this.contacts[i] = this.contact;
            }
      }
  
  
      }
      else{
       this.setData();
       this.contacts.push(this.contact);
      }
  } else {
    // validate all form fields
    Object.keys(this.contactForm.controls).forEach(field => { // {1}
      const control = this.contactForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }
  
  
this.closeBtn.nativeElement.click();
}

setData()
{
  this.contact.id = this.contacts.length + 1;
  this.contact.firstName = this.firstName;
  this.contact.lastName = this.lastName;
  this.contact.email = this.email;
  this.contact.phoneNumber = this.phoneNumber;
}
}
