import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  isUser;
  isMag: boolean;
  isAdmin: boolean;
  warnmessage: string;

  ImageForm;
  errorMessage: string;
  succesMessage: string;
  submitted = false;
  users: Users[];
  formData = new FormData();
  MessageInscription;
  notifActives: boolean;


  userSUb: Subscription;



  Loading: boolean;
  constructor(private auth: AuthService, private router: Router, private messagingService: MessagingService,
    private fromBuilder: FormBuilder, private allusersService: AllUsersService, private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      })

    this.ImageForm = this.fromBuilder.group({
      files: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    // this.auth.isAuth$
    let data = JSON.parse(localStorage.getItem('auth'))
    let mag = JSON.parse(localStorage.getItem('magasin'))
    this.isUser = data["data"]


    this.userSUb = this.allusersService.users$.subscribe(
      (userAl: Users[]) => {
        this.users = userAl
        this.Loading = true;
      },
      (err) => {
        this.Loading = false;
      }
    );

    this.allusersService.getbyId(data["data"]['id']);

    this.myBrowser(false);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUb.unsubscribe();
  }

  get files() {
    return this.ImageForm.get('files');
  }




  handleImage(files: FileList) {
    this.formData.delete('files');
    this.formData.append('files', files[0]);
  }

  changeWebsite(e) {
    console.log(e.target.value);
  }

  onSubmit() {
    this.submitted = true;
    if (this.ImageForm.invalid) {
      return;
    }
    let data = JSON.parse(localStorage.getItem('auth'))

    const files = this.ImageForm.get('files').value;

    this.formData.append("idUser", data["data"]['id']);

    this.auth.upadateCertificat(this.formData)
      .then((data) => {
        this.succesMessage = data["message"];

        window.location.reload();
      })
      .catch((err) => {
        this.formData = new FormData();
        this.ImageForm.reset();
        this.errorMessage = err;
      });
  }

  verifSubscription(browser, notif) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.messagingService.requestVerif(browser, notif, token).then((datas: any) => {
          // console.log(datas["NbAbos"]);
          this.notifActives = (datas["NbAbos"] != 0);
          // console.log("notifActives="+this.notifActives);
          this.MessageInscription = datas.message;
        })
          .catch((err) => {

            this.errorMessage = err;
          })
      },
      (err) => {
        console.error("Impossible d'obtenir la permission de notifier.", err);
      }
    );
    this.messagingService.receiveMessage();
  }

  pushSubscription(browser, notif) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.messagingService.requestPermission(browser, notif, token).then((datas: any) => {
          console.log(datas)
          this.MessageInscription = datas.message
        })
          .catch((err) => {

            this.errorMessage = err;
          })
      },
      (err) => {
        console.error("Impossible d'obtenir la permission de notifier.", err);
      }
    );
    this.messagingService.receiveMessage()
  }

  smsSubscribe(device, typeNotif) {
    this.messagingService.requestIos(device, typeNotif).then((datas: any) => {
      console.log(datas)
      this.MessageInscription = datas.message
    })
      .catch((err) => {

        this.errorMessage = err;
      })
  }

  myBrowser(abonner = true) {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      return (abonner ? this.pushSubscription("Opera", 'Notification Mail') : this.verifSubscription("Opera", 'Notification Mail'));
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return (abonner ? this.pushSubscription("Chrome", 'Notification Mail') : this.verifSubscription("Chrome", 'Notification Mail'));
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return (abonner ? this.smsSubscribe('Safari', 'SMS') : this.verifSubscription('Safari', 'SMS'));
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return (abonner ? this.pushSubscription("Firefox", 'Notification Mail') : this.verifSubscription("Firefox", 'Notification Mail'));
    } else {
      return (abonner ? this.pushSubscription("Autre", 'Notification Mail') : this.verifSubscription("Autre", 'Notification Mail'));
    }
  }

}
