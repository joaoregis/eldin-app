import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  showToast(msg: string): void {
    this.toast.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  login(user: any): void {
    this.isLoading = true;
    this.authService.loginUser(user)
      .then(
        res => { this.router.navigateByUrl('/home'); this.isLoading = false; }
      )
      .catch((err) => {

        this.isLoading = false;
        this.showToast('Usuário e/ou Senha inválidos');

      });
  }

}
