import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { AutreService } from 'src/app/services/other/autre.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';

@Component({
  selector: 'app-liste-magasins',
  templateUrl: './liste-magasins.component.html',
  styleUrls: ['./liste-magasins.component.css']
})
export class ListeMagasinsComponent implements OnInit {
  errorMessage: string;
  users:Users;
  liste ;
  magasinSub:Subscription;


  listeUSer ;
  listeUSerSub:Subscription;

  Loading:boolean;



  constructor(private router:Router,private auth:AuthService,private magasinservice:MagasinService,
     private route: ActivatedRoute,private swPush: SwPush,private autreService:AutreService,private webNotification: WebNotificationServiceService) {
      this.loadScript()

     }

  ngOnInit(): void {

    this.magasinservice.getMagasinsAllTest("mag").then(sub => {
      this.liste =sub['data']['rows']
      console.log(sub)

   //   this.Loading=true;
    })
    .catch(err => {
      console.error( err);
      //this.Loading=false;
    });

  }

  //
  addtoMagasin(item){

    let data= JSON.parse(localStorage.getItem('UsersMagasinListe'))
    let datauser=JSON.parse( localStorage.getItem('partial'))

    if (data!=null) {
        this.autreService.listdejaInscrit$.subscribe(
            (resultat:any)=>{
              
              if (resultat?.length == 0) {

                 this.auth.selectMagasin(data.email,item.id).then((resul) => {

                    this.auth.connexion(data.email,datauser.text).then((dataResult) => {
                      this.router.navigate(['/waiting-Page'])
                    }).catch((err) => {
                      this.errorMessage = err;
                    })

                }).catch((err) => {

                  //this.errorMessage = err;
                })
              }
              if (resultat?.length >0){
                let message ="Vous aviez déjà choisi votre magasin, veuillez vous reconnecter."
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);
              }

        },
          (err)=>{
            this.errorMessage = err;
        })

      this.autreService.getdejaInscrit(data.id);
    }if(data==null){
      this.errorMessage="Action non autorisée"
    }

  }

  deconnexion(){

    this.auth.logoutUser();
    this.router.navigate(['/'])


  }


  loadScript() {

    const dynamicScripts = [
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Frontend/vendor/OwlCarousel/owl.carousel.js",
      "assets/Frontend/vendor/semantic/semantic.min.js",
      "assets/Frontend/js/jquery.countdown.min.js",
      "assets/Frontend/js/custom.js",
      "assets/Frontend/js/offset_overlay.js",
      "assets/Frontend/js/night-mode.js",

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

/*
  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
        let data= JSON.parse(localStorage.getItem('auth'))
        let mag= JSON.parse(localStorage.getItem('magasin'))
        console.log(mag)

        this.webNotification.subscribeToNotification(data["data"]['id'],data["data"]['idmagasin'])
      })
      .catch((err) => console.log(err));
  } */


}
