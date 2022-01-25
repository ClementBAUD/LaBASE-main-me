import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Famille } from 'src/app/models/famille';
import { Magasin } from 'src/app/models/magasin';
import { Produits } from 'src/app/models/produits';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { CartservicesService } from 'src/app/services/cart/cartservices.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.css']
})
export class CategorieProduitComponent implements OnInit {


  isUser;
  isMag:boolean;
  warnmessage:string;
  infoMag:string;
  userMag ;
  userMagSub:Subscription;
  errorMessage: string;
  Loading:boolean;
  LoadingP:boolean;
  LoadingC:boolean;
  listeProduit: Produits[];
  listeP: [];
  listeProduitSub: Subscription;

  listeCategorie:Famille [];
  listeCategorieSub: Subscription;
  constructor(private auth:AuthService,private router:Router,private magasinService :MagasinService,
    private produitMiseDispoService:ProduitMiseDispoService,private cartservicesService:CartservicesService,
    private toastr: ToastrService) {

   }

  ngOnInit(): void {
    let data= JSON.parse(localStorage.getItem('auth'))
    let mag= JSON.parse(localStorage.getItem('magasin'))
    this.isUser=data["data"]

    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
        this.Loading=false
      }

      this.userMag=data
      this.Loading=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })

    this.listeCategorieSub = this.produitMiseDispoService.categorieproduit$.subscribe(
      (res:Famille[]) => {

        if (res.length==0) {
          this.listeCategorie =[];
        }  if (res.length>0){
          this.listeCategorie = res;
      }
      this.LoadingC = true;
      },
      (err) => {
        this.LoadingC = false;
        // console.log(err)
      }
    );
    let idMagasin = data["data"]["idmagasin"];
    this.magasinService.getMagasinsById(data["data"]["idmagasin"]);
    this.produitMiseDispoService.getCategoriesProduit(idMagasin);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeCategorieSub.unsubscribe();

  }





}
