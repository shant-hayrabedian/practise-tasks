import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksList: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;
  tasksLists: AngularFireList<Task>;
  userId: string;
  // tasks;

  constructor(public afs: AngularFirestore, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.tasksList = this.afs.collection('tasks', ref => ref.orderBy('title', 'asc'));
    // this.tasks = this.tasksList.snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Task;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // }));

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getTaskList(): Observable<Task[]> {
    // return this.tasks;
    if (!this.userId) { return; }
    this.tasksLists = this.db.list(`tasks/${this.userId}`);
    this.tasks = this.tasksLists.valueChanges();
    return this.tasks;
  }

  addTask(task: Task) {
    // this.tasksList.add(task);
    this.tasksLists.push(task);
  }

  updateTask(task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.update(task);
  }

  deleteTask(task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.delete();
  }
}
