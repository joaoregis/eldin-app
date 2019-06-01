import { Observable } from 'rxjs';
import { CurriculosService } from './../../services/curriculos.service';
import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  users: Observable<Curriculo[]>;

  constructor(
    private curriculosService: CurriculosService
  ) { }

  onSearch(value) {

    console.log(value);

    if (value === '') {

      this.users = this.curriculosService.getCurriculos();

    } else {

      this.users = this.curriculosService.filtrarCurriculos(value);

    }

  }

  ngOnInit() {

    this.users = this.curriculosService.getCurriculos();
  }

}
