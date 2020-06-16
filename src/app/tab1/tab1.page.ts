import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../login/loginPopover/popover/popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  constructor(public modalController: ModalController, public popoverController: PopoverController) {}

  public avatar = "assets/img/avatar.png"
  public headImg = "assets/img/c19-simbol.png"
  public slide1Img = "assets/img/covid19-img.png"
  public slide2Img = "assets/img/api-img.png"
  public documentacao = "https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#81415d42-eb53-4a85-8484-42d2349debfe"

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  checkLogin(){
    if(localStorage.getItem('logado') == 'true'){
      return true;
    }else{
      return false;
    }
  }
  
  async showLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  sair(){
    navigator['app'].exitApp();
  }

}
