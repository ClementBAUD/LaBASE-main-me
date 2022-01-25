import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
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
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  isUser;
  isMag:boolean;
  warnmessage:string;
  infoMag:string;
  userMag ;
  userMagSub:Subscription;
  errorMessage: string;
  Loading:boolean;
  LoadingM:boolean;
  listeProduit: Produits[];
  listeProduitSub: Subscription;

  constructor(private auth:AuthService,private router:Router,private routes: ActivatedRoute,
    private magasinService :MagasinService,private produitMiseDispoService:ProduitMiseDispoService,
    private cartservicesService:CartservicesService) {

   }

  ngOnInit(): void {
    let data= JSON.parse(localStorage.getItem('auth'))
    let mag= JSON.parse(localStorage.getItem('magasin'))
    this.isUser=data["data"]
    const navigation = this.router.getCurrentNavigation();

    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
        this.LoadingM=false
        this.userMag=[]
      }
      this.userMag=data
      this.LoadingM=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })


     this.listeProduitSub = this.produitMiseDispoService.produit$.subscribe(
      (res) => {
        if (res.length==0) {
          this.listeProduit =[];
        }  if (res.length>0){
          this.listeProduit = res;
        }

        this.Loading = true;
      },
      (err) => {
        this.Loading = false;
        // console.log(err)
      }
    );


     const id = this.routes.snapshot.params["id"];
    this.produitMiseDispoService.getByIDProduitDispo(id);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeProduitSub.unsubscribe();

  }

  addtocart(item: any){
    this.cartservicesService.addToCart(item);
  }
}

