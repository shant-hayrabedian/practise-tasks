import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksList: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;
  tasksLists: AngularFireList<any[]>;
  taskss: any;


  constructor(public afs: AngularFirestore, private af: AngularFireDatabase) {
    this.tasksList = this.afs.collection('tasks', ref => ref.orderBy('title', 'asc'));
    this.tasks = this.tasksList.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getTaskList() {
    // return this.tasks;
    this.tasksLists = this.af.list('tasks') as AngularFireList<Task[]>;
    // this.tasksLists.valueChanges()
    //     .subscribe(taskss => {
    //       console.log(taskss);
    //       this.taskss = taskss;
    // });
    return this.tasksLists;
  }

  addTask(task: Task) {
    this.tasksList.add(task);
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
