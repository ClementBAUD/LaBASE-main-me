import { Component, OnInit } from '@angular/core';
import { AutreService } from 'src/app/services/other/autre.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AllCommandeService } from 'src/app/services/administrateur/all-commande.service';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  InfoUSer
  isMag:boolean;
  isAdmin:boolean;
  infoMag;

  nmbreProduitDay;
  nmbreProduitDaySub:Subscription

  nmbreEtu;
  nmbreEtuSub:Subscription

  constructor(private http: HttpClient,private autreService:AutreService,private AllcommandeService:AllCommandeService, private auth:AuthService,
    ) { }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('auth'))
    this.InfoUSer=data['data']
    if (this.InfoUSer.profile=="Admin") {
     this.isAdmin=true
    }
    if (this.InfoUSer.profile=="Magasin") {
     this.isMag=true
    }

    this.infoMag = JSON.parse(localStorage.getItem('mag'))
  //  console.log(this.infoMag)


      if (this.InfoUSer.profile=="Magasin") {


        this.auth.getMagasin(data['data']['id']).then((datas) => {
          localStorage.setItem('magasins', JSON.stringify(datas));
          localStorage.setItem('mag', JSON.stringify(datas));
          localStorage.setItem('listeMagasins', JSON.stringify(datas));
          this.nmbreProduitDaySub= this.autreService.commandeNovalideDay$.subscribe(
            (res:[])=>{
                this.nmbreProduitDay =res


            },
            (err)=>{
              this.nmbreProduitDay=0;
              console.log(err)
            }
          );
          let idMagasin =this.infoMag[0].id
          this.autreService.getNbreComEncours(idMagasin);


        }).catch((err) => {

        })



      }




    if(this.InfoUSer.profile=="Admin"){

      this.nmbreEtuSub= this.AllcommandeService.nbreEtuAtt$.subscribe(
        (res:[])=>{
            this.nmbreEtu =res
        },
        (err)=>{
          this.nmbreEtu=0;
          console.log(err)
        }
      );
      this.AllcommandeService.getNbreEtudiantAttent();


    }


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const data = JSON.parse(localStorage.getItem('auth'))
    let prof=data['data']
    if (prof.profile=="Magasin") {
    this.nmbreProduitDaySub.unsubscribe();
    }
    if (prof.profile=="Admin") {
      this.nmbreEtuSub.unsubscribe();
    }

    //nmbreEtuSub
  }

}
