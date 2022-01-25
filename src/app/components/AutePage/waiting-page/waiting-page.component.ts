import { Component, OnInit } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';
import { environment } from 'src/environments/environment';
import { MessagingService } from 'src/app/services/messaging.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import * as Bowser from "bowser";
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.css'],
})
export class WaitingPageComponent implements OnInit {
  isUser;
  renewMessage;
  LoadingM;
  userMag;
  message;
  errorMessage;
  MessageInscription
  userSUb: Subscription;
  users: Users[];
  statut:string;
  Loading: Boolean;
  validationMessage;
  title = 'push-notification';
  userAgentDetails;

  currentMessage = new BehaviorSubject(null);

  constructor(
    private swPush: SwPush,
    private magasinService: MagasinService,
    private webNotification: WebNotificationServiceService,
    private messagingService: MessagingService,
    private allusersService: AllUsersService,
    private auth:AuthService,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 750,
    autoplay: true,
    navText: ['', ''],
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    margin: 10,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  reloadCurrentPage() {
    window.location.reload();
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('auth'));
    let mag = JSON.parse(localStorage.getItem('magasin'));
    this.isUser = data['data'];

    this.renewMessage =
      'Votre certificat de scolarité a expiré. Merci de nous en faire parvenir un en cours de validité';

    this.userSUb = this.allusersService.users$.subscribe(
      (userAl: Users[]) => {
        this.users = userAl;
        console.log(userAl)
        if (userAl?.length !=0) {
          this.statut =userAl[0]['nomStatut']
          if (this.statut == 'valider') {
             this.validationMessage = 'Votre compte a été mis à jour. Veuillez vous reconnecter s’il vous plaît';
          }
        }else{
          this.statut='attente'
        }

      },
      (err) => {}
    );

    this.allusersService.getbyId(data['data']['id']);
  }

  dateDiff(d1, d2) {
    d1 = d1.getTime() / 86400000;
    d2 = d2.getTime() / 86400000;
    return new Number(d2 - d1).toFixed(0);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUb.unsubscribe();
  }

  deconnexion() {
    this.auth.logoutUser();
    window.location.reload();
  }

  pushSubscription(browser,notif) {

    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
         this.messagingService.requestPermission(browser,notif,token).then((datas:any)=>{
           console.log(datas)
               this.MessageInscription=datas.message
            })
            .catch((err)=>{

              this.errorMessage=err;
            })

          },
          (err) => {
            console.error("Impossible d'obtenir la permission de notifier.", err);
          }
    );
    this.messagingService.receiveMessage()

}

smsSubscribe(device,typeNotif) {
  this.messagingService.requestIos(device,typeNotif).then((datas:any)=>{
    console.log(datas)
        this.MessageInscription=datas.message
     })
     .catch((err)=>{

       this.errorMessage=err;
     })
}

myBrowser() {

  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {

    return  this.pushSubscription("Opera",'Notification Mail')

  }else if(navigator.userAgent.indexOf("Chrome") != -1 ){
    return this.pushSubscription("Chrome",'Notification Mail')

  }else if(navigator.userAgent.indexOf("Safari") != -1){
    return this.smsSubscribe('Safari','SMS')
  }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {

       return this.pushSubscription("Firefox",'Notification Mail') ;

  } else {

     return this.pushSubscription("Autre",'Notification Mail')

  }

}
}
