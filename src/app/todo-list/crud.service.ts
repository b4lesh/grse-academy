import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private angularFirestore: AngularFirestore) {}

  addTask(task): any {
    return this.angularFirestore.collection('todo-list').add(task);
  }
}
