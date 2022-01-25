import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commandes } from 'src/app/models/commandes';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { Produits } from 'src/app/models/produits';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';

//CommandesService
@Component({
  selector: 'app-commande-jour',
  templateUrl: './commande-jour.component.html',
  styleUrls: ['./commande-jour.component.css']
})
export class CommandeJourComponent implements OnInit {

  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 80;

  succesMessage:string;
  errorMessage: string;


  listeCommande : Commandes[];
  listeCommandeSub:Subscription;

  Loading:boolean;

  iddelete;

  title = 'Liste des produits';
  dtOptions: any = {};

  constructor(private http: HttpClient,private commandesService:CommandesService,
    private router:Router,private modalService: NgbModal,private webNotification:WebNotificationServiceService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string};
      this.succesMessage = state.data;
    }
   }


  ngOnInit(): void {

    this.listeCommandeSub= this.commandesService.commandeMagday$.subscribe(
      (res:[])=>{
          this.listeCommande =res


            this.Loading=true;

      },
      (err)=>{
        this.Loading=false;
       // console.log(err)
      }
    );

    const data = JSON.parse(localStorage.getItem('mag'))
    let idMagasin =data[0].id
    this.commandesService.getCommandeMagasinDay(idMagasin);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'print'
        ]
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeCommandeSub.unsubscribe();
  }

  onSubmitnotif(userId) {
    let  titre="Rappel ";
    let  info="N'oubliez pas de venir chercher votre commande"
    this.webNotification.sendNotificationUser(userId,titre,info)
    .then((datas) => {
     // this.succesMessageNot=datas["message"];

    })
    .catch((err) => {

      this.errorMessage = err;
    });
  }


}
