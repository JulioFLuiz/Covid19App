import { Component, ViewChild, ElementRef} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Covid19Service } from '../covid19/covid19.service';
import { PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Chart } from "chart.js";
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[Covid19Service,LoginPage]
})


export class Tab3Page {

  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  constructor(public modalController: ModalController, public apiCovid: Covid19Service, public popoverController: PopoverController, public loadingController: LoadingController, public toastController: ToastController, public router: Router, public login: LoginPage) {}
  
  public barChart: Chart;
  public doughnutChart: Chart;
  public avatar = "assets/img/avatar.png";
  public headImg = "assets/img/c19-simbol.png";
  public casos = new Array<any>();
  public pais;
  public vPais = new Array<any>();

  async showLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

   carregarPagina(){
    this.apiCovid.casosPaisesCovid19().subscribe(
      data =>{
        const response = (data as any);
          if(this.casos.length === 0){
          this.casos = this.casos.concat(response);
          }
      },
      error =>{
        console.error(error);
      }
    )

  }

  CompleteLoad(){
    if(this.pais != null && this.pais != ""){
      this.procurarPais()
    }else{
        this.vPais[0] = "Global";
        this.vPais[1] = this.casos[0].Global.NewConfirmed;
        this.vPais[2] = this.casos[0].Global.TotalConfirmed;
        this.vPais[3] = this.casos[0].Global.NewDeaths;
        this.vPais[4] = this.casos[0].Global.TotalDeaths;
        this.vPais[5] = this.casos[0].Global.NewRecovered;
        this.vPais[6] = this.casos[0].Global.TotalRecovered;
        this.globalDashboard();
        this.paisDashboard();
    }
  }

  async Loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Carregando...',
      duration: 1500
    });
    await loading.present();
  }

  procurarPais(){
    let aux: number = this.casos[0].Countries.length;
    let i: number = 0;
    do{
      if(this.pais != "" && this.casos[0].Countries[i].Country === this.pais){
        this.vPais[0] = this.casos[0].Countries[i].Country;
        this.vPais[1] = this.casos[0].Countries[i].NewConfirmed;
        this.vPais[2] = this.casos[0].Countries[i].TotalConfirmed;
        this.vPais[3] = this.casos[0].Countries[i].NewDeaths;
        this.vPais[4] = this.casos[0].Countries[i].TotalDeaths;
        this.vPais[5] = this.casos[0].Countries[i].NewRecovered;
        this.vPais[6] = this.casos[0].Countries[i].TotalRecovered;
        this.globalDashboard();
        this.paisDashboard();
      }
      i++
    }while(i<=aux);
  }

  globalDashboard(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["N-C", "T-C", "N-M", "T-M", "N-R", "T-R"],
        datasets: [
          {
            label: "Resetar",
            data: [this.vPais[1], this.vPais[2], this.vPais[3], this.vPais[4], this.vPais[5], this.vPais[6]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  paisDashboard(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["N-C", "T-C", "N-M", "T-M", "N-R", "T-R"],
        datasets: [
          {
            label: "# of Votes",
            data: [this.vPais[1], this.vPais[2], this.vPais[3], this.vPais[4], this.vPais[5], this.vPais[6]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
  }
  async loginToast(){
    const toast = await this.toastController.create({
      message: 'Precisa Efetuar Login para acessar.',
      duration: 1500
    });
    toast.present();
  }
  checkLogin(){
    if(this.login.checkLogin()){
      this.Loading();
      this.carregarPagina();
      setTimeout(() => this.CompleteLoad(), 1000);
    }else{
      this.loginToast();
      this.router.navigate(['tabs/tab1']);
    }
  }

  ionViewDidEnter(){
    this.checkLogin();
  }
  sair(){
    navigator['app'].exitApp();
  }
}