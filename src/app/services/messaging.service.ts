import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';
import { AbonnementUser } from '../models/abonnement-user';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private api = environment.api;
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,private http: HttpClient) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })

  }

  requestPermission(navig,notif,TokenDevice:any) {
    const data = JSON.parse(localStorage.getItem('auth'))
    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

    let dat ={
      userId:data.data.id,
      idmag:data.data.idmagasin,
      sub:TokenDevice,
      notif:notif,
      device:navig,
      tel:data.data.tel
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/notificationCreate', dat,{headers:yourHeader}).subscribe(
        (dataUsers) => {
          //authentification
          if (dataUsers['statut'] == true) {
            resolve(dataUsers)
          }
          else {
            reject(dataUsers['message'])
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })

  }

  requestVerif(navig,notif,TokenDevice:any) {
    const data = JSON.parse(localStorage.getItem('auth'))
    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

    let dat ={
      userId:data.data.id,
      idmag:data.data.idmagasin,
      sub:TokenDevice,
      notif:notif,
      device:navig,
      tel:data.data.tel
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/notification-verif', dat,{headers:yourHeader}).subscribe(
        (dataUsers) => {
          //authentification
          if (dataUsers['statut'] == true) {
            resolve(dataUsers)
          }
          else {
            reject(dataUsers['message'])
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })

  }

  requestIos(navig,notif) {

    const data = JSON.parse(localStorage.getItem('auth'))
    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})


        let dat ={
          userId:data.data.id,
          idmag:data.data.idmagasin,
          sub:"",
          notif:notif,
          device:navig,
          tel:data.data.tel

        }


        return new Promise((resolve, reject) => {
          this.http.post(this.api + 'notification/notificationCreate', dat,{headers:yourHeader}).subscribe(
            (dataUsers) => {
              //authentification
              if (dataUsers['statut'] == true) {
                console.log(dataUsers)
                resolve(dataUsers)
              }
              else {
                reject(dataUsers['message'])
              }
            }, (err) => {

              reject(err.error.message)
            }
          )
        })



  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("nouveau message reçu. ", payload);
        this.currentMessage.next(payload);
      })
  }


}
