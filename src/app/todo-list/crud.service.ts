import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private angularFirestore: AngularFirestore) {}

  getAllTasks(): Observable<any> {
    return this.angularFirestore.collection('todo-list').snapshotChanges();
  }

  addTask(task): any {
    return this.angularFirestore.collection('todo-list').add(task);
  }
}
