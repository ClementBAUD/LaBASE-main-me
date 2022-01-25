import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commandes } from 'src/app/models/commandes';
import { Subscription } from 'rxjs';
import { Produits } from 'src/app/models/produits';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute,Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { Users } from 'src/app/models/users';
import { StatutCommmande } from 'src/app/models/statut-commmande';
import { AutreService } from 'src/app/services/other/autre.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {
  users ;

  statut:StatutCommmande[];
  statutSUb:Subscription;

  commmandeifno:Commandes[]
  commmandeifnoSub:Subscription;

  commmandes:[];
  commmandeSub:Subscription;

  lastcomm:boolean;

  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;

  Loading:boolean;
  LoadingM:boolean;
  userMag;
  LoadingMag:boolean;
  errorMessage: string;
  succesMessage:string;

  submitted = false;
  formData = new FormData();
  changeStatutForm;

  UserId="";

  title = 'Liste des produits';
  dtOptions: any = {};



  constructor(private fromBuilder: FormBuilder,private http: HttpClient,private commandesService:CommandesService,private route: ActivatedRoute,
    private router:Router,private modalService: NgbModal,private autreService:AutreService,private webNotification:WebNotificationServiceService,private magasinService :MagasinService) {



   }

   ngOnInit(): void {
    window.scrollTo(0,0);
    const  id= this.route.snapshot.params["id"];
    let data= JSON.parse(localStorage.getItem('auth'))

    this.commmandeSub = this.commandesService.commandeDetail$.subscribe(
      (res:[])=>{
          this.lastcomm = false;

          this.commmandes =res
          this.Loading=true;

      },
      (err)=>{
        this.Loading=false;
      }
    );

    // info commande
    this.commmandeifnoSub = this.commandesService.commandeinfo$.subscribe(
      (res:Commandes[])=>{
          this.commmandeifno =res
          console.log(res)

          this.LoadingM=true;
      },
      (err)=>{
        this.Loading=false;
      }
    );

    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
        this.LoadingMag=false
        this.userMag=[]
      }
      this.userMag=data
      console.log(data)
      this.LoadingMag=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })



    this.commandesService.getDetailCommand(id.toString(),data['data']['idmagasin']);

    this.commandesService.getInfoCommand(id.toString());



  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commmandeSub.unsubscribe();
    this.commmandeifnoSub.unsubscribe();
  }



}
