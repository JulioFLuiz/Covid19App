import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from './autenticacao.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public modalController: ModalController, public toastController: ToastController, public authService: AutenticacaoService, public router: Router) { }

  public avatar = "assets/img/avatar.png"

  public email: string = "";
  public password: string = "";

  loginAuth(){
    let aux;
    let notError:boolean = true;
    aux = this.authService.loginFire(this.email,this.password)
      .catch ((error) => {
        let autCode = error.code;
        console.log(error);
        if (autCode === "auth/wrong-password"){
          this.wrongPasswordToast();
          localStorage.setItem('logado', 'false')
          notError = false;
        }else if(autCode === "auth/user-not-found"){
          this.loginNotExistToast();
          localStorage.setItem('logado', 'false')
          notError = false;
        }
      }).then(() => {
        if(notError){
          this.loginCompleteToast();
          localStorage.setItem('logado', 'true')
          console.log(localStorage.getItem('logado'));
          this.exitLogin();
          this.router.navigate(['tabs/tab1']);
          }
      })
  }

  async loginCompleteToast(){
    const toast = await this.toastController.create({
      message: 'Login efetuado com sucesso.',
      duration: 1500
    });
    toast.present();
  }
  async wrongPasswordToast(){
    const toast = await this.toastController.create({
      message: 'Senha incorreta.',
      duration: 1500
    });
    toast.present();
  }
  async loginNotExistToast(){
    const toast = await this.toastController.create({
      message: 'Login não encontrado.',
      duration: 1500
    });
    toast.present();
  }
  async deslogarToast(){
    const toast = await this.toastController.create({
      message: 'Deslogado com sucesso.',
      duration: 1500
    });
    toast.present();
  }
  
  exitLogin() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

  redirect(id:number = 1){
    if(id == 1){
      this.exitLogin();
      this.router.navigate(['tabs/tab1']);
    }
    if(id == 2){
      this.exitLogin();
      this.router.navigate(['tabs/tab2']);
    }
    if(id == 3){
      this.exitLogin();
      this.router.navigate(['tabs/tab3']);
    }
  }

  sairLogin(){
    localStorage.setItem('logado','false');
    this.exitLogin();
    this.deslogarToast();
    this.router.navigate(['tabs/tab1']);
  }
  checkLogin(){
    if(localStorage.getItem('logado') == 'true'){
      return true;
    }else{
      return false;
    }
  }
  sair(){
    navigator['app'].exitApp();
  }
}
