import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITask } from '../modules/itask';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private angularFirestore: AngularFirestore) {}

  getAllTasks(currentUser): Observable<any> {
    return this.angularFirestore
      .collection('todo-list', (ref) =>
        ref.where('username', '==', currentUser)
      )
      .snapshotChanges();
  }

  addTask(task: ITask): Promise<any> {
    return this.angularFirestore.collection('todo-list').add(task);
  }

  updateTask(id: string, task: any): Promise<any> {
    return this.angularFirestore.collection('todo-list').doc(id).update(task);
  }

  deleteTask(id: string): Promise<any> {
    return this.angularFirestore.collection('todo-list').doc(id).delete();
  }
}
