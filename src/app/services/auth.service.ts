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
    users: Observable<User>;

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
        await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/tasks']);

        // if(email && password == Role.user) {
        //     this.router.navigate(['/tasks']);
        // } else if(email && password == Role.admin) {
        //     this.router.navigate(['/dashboard']);
        // }
    }

    doRegister(value) {
        this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
            return this.db.collection('users').doc(cred.user.uid);
        });
    }


}
