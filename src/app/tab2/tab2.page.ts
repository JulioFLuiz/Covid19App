import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../login/autenticacao.service';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public toastController: ToastController, public authService: AutenticacaoService, public modalController: ModalController) {}
  
  public avatar = "assets/img/avatar.png"
  public headImg = "assets/img/c19-simbol.png"

  public email: string = "";
  public password: string = "";

  checkLogin(){
    if(localStorage.getItem('logado') == 'true'){
      return true;
    }else{
      return false;
    }
  }

  createAuth(){
    let aut;
    aut = this.authService.createFire(this.email,this.password)
    if(aut == true){
      this.CreateToast()
    }else{
      this.unCreateToast()
    }
  }

  async showLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async CreateToast(){
    const toast = await this.toastController.create({
      message: 'Cadastro feito com sucesso.',
      duration: 1500
    });
    toast.present();
  }

  async unCreateToast(){
    const toast = await this.toastController.create({
      message: 'Cadastro feito com sucesso.',
      duration: 1500
    });
    toast.present();
  }
  sair(){
    navigator['app'].exitApp();
  }

}
