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

  addTask(task): Promise<any> {
    return this.angularFirestore.collection('todo-list').add(task);
  }

  deleteTask(id: string): Promise<any> {
    return this.angularFirestore.doc('todo-list/' + id).delete();
  }
}
