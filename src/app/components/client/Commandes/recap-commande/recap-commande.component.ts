import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Commandes } from 'src/app/models/commandes';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-recap-commande',
  templateUrl: './recap-commande.component.html',
  styleUrls: ['./recap-commande.component.css']
})
export class RecapCommandeComponent implements OnInit {
  warnmessage:string;
  commmande:Commandes[]

  commmandeSub:Subscription;
  Loading:boolean ;
  LoadingM:boolean ;

  commmandeifno:Commandes[]
  commmandeifnoSub:Subscription;

  userMag
  userMagSub:Subscription;

  constructor(private commandesService:CommandesService,private router:Router,private route: ActivatedRoute,private magasinService :MagasinService) {

   }

  ngOnInit(): void {
    const  resultat= this.route.snapshot.params["id"];

    let data= JSON.parse(localStorage.getItem('auth'))


       // liste des statuts comptes
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
    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
     //   this.LoadingM=false
        this.userMag=[]
      }
      this.userMag=data
      this.LoadingM=true

    })
    .catch((err) => {
    //this.errorMessage = err;
      this.LoadingM=false;
      console.log(err)
    })


      this.commandesService.getInfoCommand(resultat.toString());


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commmandeifnoSub.unsubscribe();
   // this.userMagSub.unsubscribe();

  }
  showCommande(id){
    this.router.navigate(['recapitulatif-commande/',id])

  }

  //detail-commande

}
