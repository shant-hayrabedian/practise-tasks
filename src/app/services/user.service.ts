import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { from } from 'rxjs';
import { User} from 'src/app/models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users:Observable<User[]>;

  constructor(public db: AngularFirestore) {
    this.usersCollection = this.db.collection('users');
    this.users = this.usersCollection.valueChanges();
   }

   getUsers() {
     return this.users;
   }

   addUser(user) {
    this.usersCollection.add(user);
   }
}
