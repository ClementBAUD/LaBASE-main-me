import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { MessagingService } from 'src/app/services/messaging.service';
import { AutreService } from 'src/app/services/other/autre.service';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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
  renewMessage;
  renewMessage1;
  listeProduitSub: Subscription;

  listeCategorie:Famille [];
  listeCategorieSub: Subscription;
  constructor(private auth:AuthService,private router:Router,private magasinService :MagasinService,
    private produitMiseDispoService:ProduitMiseDispoService,private cartservicesService:CartservicesService,
    private allusersService:AllUsersService ,private autreService:AutreService,
    private toastr: ToastrService,
    private messagingService: MessagingService) {

      this.messagingService.receiveMessage();
   }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 750,
    autoplay:true,
    navText: ['', ''],
    autoplayTimeout:5000,
   autoplayHoverPause:true,
    margin:10,


    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 750,
    navText: ['<i class="uil uil-angle-left"></i>', '<i class="uil uil-angle-right"></i>'],
    margin:10,


    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  ngOnInit(): void {
    let data= JSON.parse(localStorage.getItem('auth'))
    let mag= JSON.parse(localStorage.getItem('magasin'))
    this.isUser=data["data"]
    const navigation = this.router.getCurrentNavigation();



    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
        this.Loading=false
        this.userMag=[]
      }
      this.userMag=data
      this.Loading=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })



     this.listeProduitSub = this.produitMiseDispoService.produitM$.subscribe(
      (res) => {

        if (res["data"].length==0) {
          this.listeProduit =[];

        }  if (res["data"].length>0){
          this.listeProduit = res["data"];
        }

        this.LoadingP = true;
      },
      (err) => {
        this.LoadingP = false;
        // console.log(err)
      }
    );

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

    let d1 = new Date(data["data"]['dateExp'])
    let res=this.difDate(d1)

    if (res<=15) {
      this.renewMessage="Votre certificat de scolarité va bientôt expirer. Merci de nous en faire parvenir un en cours de validité"
      this.renewMessage1=" NB : votre compte expirera dans "+res+" jours"
    } if (res==0) {

      let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth()+1
    let year = currentDate.getFullYear()
    let dates=year+'-'+month+'-'+day
    let d2=new Date(dates)
      this.changestatut(data["data"]['id'],d2)

    }



    let idMagasin = data["data"]["idmagasin"];
    this.produitMiseDispoService.getProduitDispoM(idMagasin);
    this.produitMiseDispoService.getCategoriesProduit(idMagasin);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeProduitSub.unsubscribe();
    this.listeCategorieSub.unsubscribe();

  }

  addtocart(item: any){
    this.cartservicesService.addToCart(item);
  }

  difDate(date1){
    let d1 = new Date(date1)
    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth()+1
    let year = currentDate.getFullYear()
    let dates=year+'-'+month+'-'+day
    let d2=new Date(dates)
    let Diff_temps = d1.getTime()-  d2.getTime()
    let Diff_jours = Diff_temps / (1000 * 3600 * 24);

    return Math.round(Diff_jours)
  }

  changestatut(iduser,date){

   this.auth.changeStatusCompte(iduser,date)
      .then((datas:any)=>{
        // ajouter un message
        this.auth.logoutUser();
        window.location.reload();

      })
      .catch((err)=>{
        console.log(err)
        this.errorMessage=err;
      })
  }



}
