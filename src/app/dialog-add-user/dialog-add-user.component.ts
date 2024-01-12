import { Component, inject, Injectable } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, collectionData, doc } from '@angular/fire/firestore';
import { Observable } from "rxjs";



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  items$;
  items;
  user = new User();
  birthDate: Date;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.items$ = collectionData(this.getUsersRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    });
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.addUser(this.user.toJSON());
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  async addUser(item: {}) {
    await addDoc(this.getUsersRef(), item)
    console.log(this.getUsersRef());
  }

}
