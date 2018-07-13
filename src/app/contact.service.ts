import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable'
import { Contact } from './models/contact';
import { CONTACTS } from './models/contact-list';
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ContactService {

//   //URL for CRUD operations
//   contactUrl = "http://localhost:3000/contacts";

  constructor(private http:Http) { }

  getContacts(): Observable<Contact[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(CONTACTS);
  }

  addContact(contact:Contact): Observable<Contact[]> {
    debugger;
    CONTACTS.concat(contact);
    return of(CONTACTS);
  }


  getContact(id: number): Observable<Contact> {
    // TODO: send the message _after_ fetching the hero
    return of(CONTACTS.find(contact => contact.id === id));
  }

  //Fetch all articles
//   getAllContatcs(): Observable<Contact[]> {
//     return this.http.get(this.contactUrl).map(this.extractData).catch(this.handleError);
//   }
// }
// //Create article
// createContact(article: Contact):Observable<number> {
// let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
//     let options = new RequestOptions({ headers: cpHeaders });
//     return this.http.post(this.contactUrl, article, options)
//            .map(success => success.status)
//            .catch(this.handleError);
// }
// //Fetch article by id
// getContactById(articleId: string): Observable<Contact> {
// let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
// let options = new RequestOptions({ headers: cpHeaders });
// console.log(this.contactUrl +"/"+ articleId);
// return this.http.get(this.contactUrl +"/"+ articleId)
//  .map(this.extractData)
//  .catch(this.handleError);
// }
// //Update article
// updateContact(contact: Contact):Observable<number> {
// let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
//     let options = new RequestOptions({ headers: cpHeaders });
//     return this.http.put(this.contactUrl +"/"+ contact.id, contact, options)
//            .map(success => success.status)
//            .catch(this.handleError);
// }
// //Delete article
// deleteArticleById(articleId: string): Observable<number> {
// let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
// let options = new RequestOptions({ headers: cpHeaders });
// return this.http.delete(this.contactUrl +"/"+ articleId)
//      .map(success => success.status)
//            .catch(this.handleError);
// }
// private extractData(res: Response) {
// let body = res.json();
//     return body;
// }
// private handleError (error: Response | any) {
// console.error(error.message || error);
// return Observable.throw(error.status);
// }

}