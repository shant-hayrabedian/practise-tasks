import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User, Role} from 'src/app/models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    users: Observable<User[]>;
    role: Role

    constructor(public afAuth: AngularFireAuth,
                public db: AngularFirestore,
                private router: Router) {
        this.users = afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.db.doc<User[]>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async login(email, password) {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                if (this.db.collection<User>('users').ref.where('role', '==', Role.admin)) {
                    console.log(Role.admin);
                    this.router.navigate(['/dashboard']);
                } else if (this.db.collection<User>('users').ref.where('role', '==', Role.user)) {
                    console.log(Role.user);
                    this.router.navigate(['/tasks']);
                }
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
        this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
            return this.db.collection('users').doc(cred.user.uid);
        });
    }


}
