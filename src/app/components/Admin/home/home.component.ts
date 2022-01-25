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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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


      // nombre etudiant
      this.nmbreEtuAdSub= this.AllcommandeService.nbreEtu$.subscribe(
        (res:[])=>{
            this.nmbreEtuAd =res
            this.Loading = true;
           // console.log(res)
        },
        (err)=>{
          this.nmbreEtu=0;
          console.log(err)
        }
      );
      this.AllcommandeService.getNbreEtudiant();

      /// nombre de commande
      this.nmbreComAdSub= this.AllcommandeService.nbreCom$.subscribe(
        (res:[])=>{
            this.nmbreComAd =res
            this.Loading = true;
        },
        (err)=>{
          this.nmbreEtu=0;
          console.log(err)
        }
      );
      this.AllcommandeService.getNbreCommande();

      /// nombre de commande non récup
         this.nmbreComNoRecupAdSub= this.AllcommandeService.nbreComNo$.subscribe(
          (res:[])=>{
              this.nmbreComNoRecupAd =res
              this.Loading = true;
          },
          (err)=>{
            this.nmbreEtu=0;
            console.log(err)
          }
        );
        this.AllcommandeService.getNbreComNo();

        /// nombre de produit
        this.nmbreComProdAdSub= this.AllcommandeService.nbreProd$.subscribe(
          (res:[])=>{
              this.nmbreComProdAd =res

              this.Loading = true;
          },
          (err)=>{
            this.nmbreEtu=0;
            console.log(err)
          }
        );
        this.AllcommandeService.getNbreProduit();

        // graph  mois

          /// nombre de produit
        this.graphderniermoisSub= this.AllcommandeService.graphCom$.subscribe(
          (res:[])=>{

            // this.graphderniermois =res
           //   this.lineChartMethod(res)
              if (res.length ===0) {
                this.Loadingb = false;
                this.barChartLabels=[]
              this.barChartData  = [{data: [], label: 'Commande',barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,},];
              }else{

                res.forEach(element => {
                  this.graphderniermois.push(element["dCreat"])
                  this.graphderniersomme.push(element["nobreCommande"])

                });

              this.barChartLabels=this.graphderniermois
              this.barChartData  = [{data: this.graphderniersomme, label: 'Commande',barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,},];

              }
              this.Loadingb = true;
          },
          (err)=>{
            console.log(err)
          }
        );
        this.AllcommandeService.getGraphcom();

  }







  ngOnDestroy(): void {

    if (this.InfoUSer.profile=="Magasin") {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.listeCommandeSub.unsubscribe();
      this.nmbreComNoRecupSub.unsubscribe();
      this.nmbreEtuSub.unsubscribe();
      this.nmbreProduitDaySub.unsubscribe();
    }
    if(this.InfoUSer.profile=="Admin"){
      this.nmbreComAdSub.unsubscribe();
      this.nmbreEtuAdSub.unsubscribe();
      this.nmbreComNoRecupAdSub.unsubscribe();
      this.nmbreComProdAdSub.unsubscribe();
      this.graphderniermoisSub.unsubscribe();
    }
  }


}
