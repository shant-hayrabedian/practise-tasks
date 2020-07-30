import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection;
  users;

  constructor(public afs: AngularFirestore) {
    this.users = this.afs.collection('users').valueChanges();
   }

   getUsers() {
     return this.users;
   }
}
