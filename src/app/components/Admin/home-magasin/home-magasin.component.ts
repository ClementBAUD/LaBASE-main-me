import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutreService } from 'src/app/services/other/autre.service';
import { Commandes } from 'src/app/models/commandes';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { AllCommandeService } from 'src/app/services/administrateur/all-commande.service';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-home-magasin',
  templateUrl: './home-magasin.component.html',
  styleUrls: ['./home-magasin.component.css']
})
export class HomeMagasinComponent implements OnInit {
  canvas:any; ctx:any; canvas2:any; ctx2:any; canvas3:any; ctx3:any;

  lineChart: any;
  InfoUSer;
  infoMag;
  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 80;

  succesMessage: string;

  errorMessage:string;

  Mag;
  MagSub: Subscription;

  nmbreCom;
  nmbreEtu;
  nmbreComNoRecup;
  nmbreComSub: Subscription;

  nmbreEtuSub: Subscription;

  nmbreComNoRecupSub: Subscription;

  listeCommande: Commandes[];
  listeCommandeSub: Subscription;

  nmbreProduitDay;
  nmbreProduitDaySub: Subscription;

  //graph
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels  ;
  barChartData ;
    barChartType = 'bar';
    barChartLegend = true;
    succesMessageNot;



  Loading: boolean;
  Loadingb: boolean;
  LoadingM: boolean;

  iddelete;

  title = 'Liste des produits';
  dtOptions: any = {};

  /**
   * partie admin
   */
   nmbreComAd;
   nmbreEtuAd;
   nmbreComNoRecupAd;
   nmbreComProdAd;

   dataResulata;
   isMagasin

   nmbreComAdSub: Subscription;
   nmbreEtuAdSub: Subscription;
   nmbreComNoRecupAdSub: Subscription;
   nmbreComProdAdSub: Subscription;
   statut;

   graphderniermois=[]
   graphderniersomme=[]

   barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(239,35,31)',
    },
  ];
   graphderniermoisSub:Subscription;
  constructor(
    private http: HttpClient,
    private autreService: AutreService,
    private commandesService: CommandesService,
    private router: Router,
    private modalService: NgbModal,
    private AllcommandeService:AllCommandeService,
    private webNotification:WebNotificationServiceService,
    private auth:AuthService,
    private magasinService :MagasinService,
  ) {
    //  window.location.reload();
  }



  ngOnInit(): void {
    const datas = JSON.parse(localStorage.getItem('auth'));
    this.InfoUSer = datas['data'];
    console.info(this.InfoUSer)
    this.auth.getMagasin(datas['data']['id']).then((datas) => {
      localStorage.setItem('magasins', JSON.stringify(datas));
      localStorage.setItem('mag', JSON.stringify(datas));
      localStorage.setItem('listeMagasins', JSON.stringify(datas));
      this.infoMag = JSON.parse(localStorage.getItem('mag'));
      let  magasin = JSON.parse(localStorage.getItem('mag'));
      this.isMagasin=datas
      if (magasin) {
        this.statut = JSON.parse(localStorage.getItem('statut'));
        // liste des commandes du jours
        this.listeCommandeSub = this.commandesService.commandeMagday$.subscribe(
          (res: []) => {
            this.listeCommande = res;
            this.Loading = true;
          },
          (err) => {
            this.Loading = false;
            //console.log(err)
          }
        );

        let idMagasin = this.infoMag[0].id;
        this.commandesService.getCommandeMagasinDay(idMagasin);

        //

        //nbre etudiant
        this.nmbreEtuSub = this.autreService.nbreEtuByMag$.subscribe(
          (res: []) => {
            this.nmbreEtu = res;
            this.Loading = true;
          },
          (err) => {
            this.Loading = false;
            // console.log(err)
          }
        );

        this.autreService.getNbreEtudiant(idMagasin);

        //nbre commande
        this.nmbreComSub = this.autreService.nbreComByMagDay$.subscribe(
          (res: []) => {
            this.nmbreCom = res;
            this.Loading = true;
          },
          (err) => {
            this.Loading = false;
            // console.log(err)
          }
        );
        this.autreService.getNbreCommandeDay(idMagasin);

        //nbre commande non recup
        this.nmbreComNoRecupSub = this.autreService.nbreComNoByMagDay$.subscribe(
          (res: []) => {
            this.nmbreComNoRecup = res;

            this.Loading = true;
          },
          (err) => {
            this.Loading = false;
            // console.log(err)
          }
        );
        this.autreService.getNbreComNoDay(idMagasin);

        // nombre produit day
        //nbre commande
        this.nmbreProduitDaySub = this.autreService.nbreProdByMagDay$.subscribe(
          (res: []) => {
            console.log(res)
            this.nmbreProduitDay = res;

            this.Loading = true;
          },
          (err) => {
            this.Loading = false;
            // console.log(err)
          }
        );
        this.autreService.getNbreProduitDay(idMagasin);

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          dom: 'Bfrtip',
          buttons: ['csv', 'excel', 'print'],
        };

        this.magasinService.getMagasinsById(idMagasin).then((mag) => {
          if (mag==null) {
            this.LoadingM=false
          }
          this.Mag=mag["Ouvert"]

            // , hours = parseInt((duration/(1000*60*60))%24)
          let currentDate = new Date()

          let hours = currentDate.getHours()
          let min = currentDate.getMinutes()
          let sec = currentDate.getSeconds()

          let timing= hours+":"+min+":"+sec
          let tmp = parseInt(mag['HeureFermeture']) - parseInt(timing)

          /* if(tmp==9){
            this.notification1(idMagasin)
          } */
          this.LoadingM=true;

        })
        .catch((err) => {
        //this.errorMessage = err;
          this.LoadingM=false;
          console.log(err)
        })

      }

    }).catch((err) => {
      this.LoadingM=true;

    })




  }


  notificationAll(idMag,titre,info,statut) {

      this.webNotification.SendNotificationAllUser(idMag,titre,info,statut)
      .then((datas) => {
        this.succesMessageNot=datas["message"];
      })
      .catch((err) => {
        this.errorMessage = err;
      });

  }


  notificationsmsAlluser(idMag,message,statut) {

    this.webNotification.SendSmsAllUser(idMag,message,statut).then((datas) => {
      this.succesMessageNot=datas["message"];
    })
    .catch((err) => {
      this.errorMessage = err;
    });

 }

 onSubmitnotif(userId) {
  console.log("Envoi de la notif");
  let titre="Rappel";
  let info="N'oubliez pas de venir chercher votre commande"
  this.webNotification.sendNotificationUser(userId,titre,info)
  .then((datas) => {
   this.succesMessageNot=datas["message"];

  })
  .catch((err) => {

    this.errorMessage = err;
  });
}

  onSubmit(){
    let titre ="ouverture de la B.A.S.E.";
    let info ="Votre magasin la B.A.S.E. est désormais ouvert et vous pouvez passer commande."
    let statut ="valider";
    let link="/home";
    let message="ouverture"
    if ( this.isMagasin) {
      this.auth.online(this.isMagasin[0].id,this.Mag)
    .then(()=>{
      if (this.Mag=="0") {

          this.notificationAll(this.isMagasin[0].id,titre,info,statut)
          this.notificationsmsAlluser(this.isMagasin[0].id,message,statut)
      }
    window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
    }


  }







  ngOnDestroy(): void {
      
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.listeCommandeSub.unsubscribe();
      console.log(this.listeCommandeSub.unsubscribe())
      //this.nmbreComNoRecupSub.unsubscribe();
      this.nmbreEtuSub.unsubscribe();
      this.nmbreProduitDaySub.unsubscribe();


  }


}
