import { Curriculo } from './../models/curriculo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {

  curriculos: Observable<Curriculo[]>;
  curriculosCollection: AngularFirestoreCollection<Curriculo>;

  constructor(private afs: AngularFirestore) {

    this.curriculosCollection = afs.collection<Curriculo>('curriculos');

    this.curriculos = this.curriculosCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );

  }

  getCurriculos(): Observable<Curriculo[]> {

    return this.curriculos;

  }

  getCurriculo(id: string): Observable<Curriculo> {
    return this.curriculosCollection.doc<Curriculo>(id).valueChanges()
      .pipe(
        take(1),
        map(curriculo => {
          curriculo.id = id;
          return curriculo;
        })
      );
  }

  addCurriculo(curriculo: Curriculo): Promise<DocumentReference> {
    return this.curriculosCollection.add(curriculo);
  }

  updateCurriculo(curriculo: Curriculo): Promise<void> {
    return this.curriculosCollection.doc(curriculo.id)
      .update({
        nome: curriculo.nome,
        sobrenome: curriculo.sobrenome,
        experiencia: curriculo.experiencia,
        cargo: curriculo.cargo,
        foto: curriculo.foto,
        email: curriculo.email
      });
  }

  deleteCurriculo(id: string): Promise<void> {
    return this.curriculosCollection.doc(id).delete();
  }

}
