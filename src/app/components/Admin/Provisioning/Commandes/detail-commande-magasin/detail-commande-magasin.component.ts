import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrintDetailCommandeComponent } from '../print-detail-commande/print-detail-commande.component';
import { Commandes } from 'src/app/models/commandes';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { Produits } from 'src/app/models/produits';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute,Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { Users } from 'src/app/models/users';
import { StatutCommmande } from 'src/app/models/statut-commmande';
import { AutreService } from 'src/app/services/other/autre.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';




@Component({
  selector: 'app-detail-commande-magasin',
  templateUrl: './detail-commande-magasin.component.html',
  styleUrls: ['./detail-commande-magasin.component.css']
})

export class DetailCommandeMagasinComponent implements OnInit {

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

  errorMessage: string;
  succesMessage:string;

  submitted = false;
  formData = new FormData();
  changeStatutForm;

  UserId="";

  title = 'Liste des produits';
  dtOptions: any = {};



  constructor(private fromBuilder: FormBuilder,private http: HttpClient,private commandesService:CommandesService,private route: ActivatedRoute,
    private router:Router,private modalService: NgbModal,private autreService:AutreService,private webNotification:WebNotificationServiceService) {

      this.changeStatutForm = this.fromBuilder.group({
        statutcompt: ['', [Validators.required]],
        })

   }

   ngOnInit(): void {
    window.scrollTo(0,0);
    const  resultat= this.route.snapshot.params["id"];
    let idR = resultat.split("-");
    const id = idR[0]



    this.statutSUb = this.autreService.statutcommande$.subscribe(
      (res)=>{
          this.statut =res['rows']

          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
      }
    );

    // liste des statuts comptes
    this.commmandeSub = this.commandesService.commandeDetail$.subscribe(
      (res:[])=>{
        if (idR[1]=='P') {
          this.lastcomm = true;
          this.commmandes =res
          this.Loading=true;
        }else if(idR[1]=='D'){
          this.lastcomm = true;
          this.commmandes =res
          this.Loading=true;
        }


      },
      (err)=>{
        this.Loading=false;
      }
    );

    // info commande
    this.commmandeifnoSub = this.commandesService.commandeinfo$.subscribe(
      (res:Commandes[])=>{
          this.commmandeifno =res
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
      }
    );
    const data = JSON.parse(localStorage.getItem('mag'))
    let ifoMag =data[0].id

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [

        ]
    };

    this.commandesService.getDetailCommand(id.toString(),ifoMag);

    this.commandesService.getInfoCommand(id.toString());

    this.autreService.getStatutCommande();


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.statutSUb.unsubscribe();
  }

  get statutcompt() {
    return this.changeStatutForm.get('statutcompt');
  }

  onSubmit(){
    this.submitted = true;
    if (this.changeStatutForm.invalid) {
      return;
    }
    const  resultat= this.route.snapshot.params["id"];
    let idR = resultat.split("-");
    const id = idR[0]
    const datess=idR[1]
    const Statutcompt = this.changeStatutForm.get('statutcompt').value;
    const dataall = JSON.parse(localStorage.getItem('auth'));
    let info="";
    if (Statutcompt.nom == "Validée") {
      info = "Votre commande a été validée, vous pourrez la récupérer à l'heure indiquée.";
    }
    if (Statutcompt.nom == "Annulée") {
      info = "Votre commande a été annulée, veuillez contacter le service client pour plus d'informations.";
    }

    // let cmd = this.commmandeifno[0];
    // console.log(cmd);
    // console.log(cmd["userId"]);
    let data={
      idUser:this.commmandeifno[0]["userId"],
      id:id,
      statutcommandeId:Statutcompt.id
    }

    const titre="Informations concernant votre commande";
     this.commandesService.changeStatutCommande(data)
      .then((datas:any)=>{
        this.succesMessage=datas["message"]

        if (datess=='D') {
          if (Statutcompt.nom=="Validée" || Statutcompt.nom=="Annulée") {
            // console.log("Envoi de la notif car chgt de statut :"+Statutcompt.nom);
            this.onSubmitnotif(data["idUser"],titre,info);
          }
        }
        window.location.reload();
        //this.onSubmitnotif(id,titre,info)
      })
      .catch((err)=>{
        this.formData = new FormData();
        this.errorMessage=err;
      })
  }

  onSubmitnotif(userId,titre,info) {

    this.webNotification.sendNotificationUser(userId,titre,info)
    .then((datas) => {
     // this.succesMessageNot=datas["message"];

    })
    .catch((err) => {

      this.errorMessage = err;
    });


  }


}
