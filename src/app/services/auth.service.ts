import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, of as observableOf} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import {User, Role} from 'src/app/models/User';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    users: Observable<User[]>;
    role: Role;
    uid = this.afAuth.authState.pipe(
        map(user => {
            if (!user) {
                return null;
                // return this.db.doc<User[]>(`users/${user.uid}`).valueChanges();
            } else {
                return user.uid
                // return of(null);
            }
        })
    );
    isAdmin = this.uid.pipe(
        switchMap(uid => {
            if(!uid) {
                return observableOf(false)
            } else {
                return this.db2.object('/users/' + uid).valueChanges()
            }
        })
    )

    constructor(public afAuth: AngularFireAuth,
                public db: AngularFirestore,
                private router: Router,
                private db2: AngularFireDatabase) {
        
    }

    async login(email, password) {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                if(this.isAdmin ) {
                    console.log(this.isAdmin)
                     this.router.navigate(['/tasks']); 
                } else {
                    console.log(this.isAdmin)
                     this.router.navigate(['/dashboard']);
                }


                //
                // if (this.db.collection<User>('users').ref.where('role', '==', Role.admin)) {
                //     console.log(Role.admin)
                //     return this.router.navigate(['/dashboard']);
                // } else if (this.db.collection<User>('users').ref.where('role', '==', Role.user)) {
                //     console.log(Role.user)
                //     return this.router.navigate(['/tasks']);
                // }
            }).catch((error)=> {
                alert(error + ' Something Error Please Try again');
            });
  
        // if(this.db.collection<User>('users').doc('role').get()){
        //     // .ref.where('role', '==', Role.admin).get()) {
        //             console.log(Role.admin)
        //             this.router.navigate(['/dashboard']);
        //     }
        //      else if(this.db.collection<User>('users').doc('role').get()) {
        //         console.log(Role.user)
        //         this.router.navigate(['/tasks']);
        //     }
        /////   
        // if(this.db.collection<User>('users').ref.where('role', '==', Role.admin)) {
        //     console.log(Role.admin)
        //     this.router.navigate(['/dashboard']);
        // } else if(this.db.collection<User>('users').ref.where('role', '==', Role.user)) {
        //     console.log(Role.user)
        //     this.router.navigate(['/tasks']);
        // }

    }

    doRegister(value) {
       return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
            this.db.collection('users').doc(cred.user.uid);
            alert(' You Have Been Successfully Registered');
        }).catch((error)=> {
            alert(error + ' Something Error Please Try again');
        });
    }

    signOutUser() {
        this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/login']); });
    }


}
