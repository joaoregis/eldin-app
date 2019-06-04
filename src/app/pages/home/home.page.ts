import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Observable } from 'rxjs';
import { CurriculosService } from './../../services/curriculos.service';
import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  users: Observable<Curriculo[]>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private curriculosService: CurriculosService,
    private callNumber: CallNumber
  ) { }

  onSearch(value) {

    console.log(value);

    if (value === '') {

      this.users = this.curriculosService.getCurriculos();

    } else {

      this.users = this.curriculosService.filtrarCurriculos(value);

    }

  }

  // tslint:disable-next-line: variable-name
  doCall(number: string): void {

    this.callNumber.callNumber(number, true);

  }


  ngOnInit() {

    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.users = this.curriculosService.getCurriculos();
  }

}
