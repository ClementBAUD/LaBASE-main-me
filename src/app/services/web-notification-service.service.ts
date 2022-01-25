import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AbonnementUser } from './../models/abonnement-user';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class WebNotificationServiceService {
  private api = environment.api;

  listeusernotification;
  listeusernotification$= new Subject();

  usernotification:[];
  usernotification$= new Subject();



  constructor(private http: HttpClient,  private swPush: SwPush) { }


  emitUsernotification() {
    this.usernotification$.next(this.usernotification)
  }

  emitListeusernotification() {
    this.listeusernotification$.next(this.listeusernotification)
  }


// send message sms all user
  SendSmsAllUser(idMag,message,statut){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})


        const params ={
                      'idMag': idMag,
                      'message': message,
                      'statut':statut,
                    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/sms-all',params,{headers:yourHeader}).subscribe(
        (data) => {

          if (data["statut"] == true) {
           // this.sendNotifications(data["data"])

            resolve(data["message"])
          }
          else {

            reject(data['message'])
          }

        }, (err) => {
          console.log(err)
          reject(err.error.message)
        }
      )
    })
  }
//

// send message sms by user
SendSmsByUser(message,receiverTel){

  const data = JSON.parse(localStorage.getItem('auth'))

  const yourHeader: HttpHeaders = new HttpHeaders({
   Authorization: `${data.token}`})


      const params ={
                    'message': message,
                    'receiverTel': receiverTel,
                  }

  return new Promise((resolve, reject) => {
    this.http.post(this.api + 'notification/sms',params,{headers:yourHeader}).subscribe(
      (data) => {
        if (data["statut"] == true) {
         // this.sendNotifications(data["data"])
          resolve(data["message"])
        }
        else {

          reject(data['message'])
        }

      }, (err) => {

        reject(err.error.message)
      }
    )
  })
}


SendALLEmail(idMag,titre,info,statut){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})


        const params ={
                      'idMag': idMag,
                      'titre': titre,
                      'info': info,
                      'statut':statut,
                    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/sendAll',params,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
           // this.sendNotifications(data["data"])
            resolve(data["message"])
          }
          else {

            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })
}


SendNotificationAllUser(idMag,titre,info,statut){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})


        const params ={
                      'idMag': idMag,
                      'titre': titre,
                      'corps': info,
                      'statut':statut,

                    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/notification-all',params,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
           // this.sendNotifications(data["data"])
            resolve(data["message"])
          }
          else {

            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }


sendNotificationUser(userId,titre,info) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    const params ={
      'userId': userId,
      'titre': titre,
      'corps': info
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/notification-user',params,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
          //  this.sendNotifications(data["data"])
            resolve(data)
          }
          else {

            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }

updateStatutSubscription(userId,statut){
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})
    console.log(statut)

    const params ={
      'userId': userId,
      'statut': statut,
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/notification-update',params,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
           // this.sendNotifications(data["data"])
            resolve(data)
          }
          else {

            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }

SendEmail(message,receiverEmail){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

        const params ={
                      'message': message,
                      'receiverEmail': receiverEmail

                    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'notification/mail',params,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
            resolve(data)
          }
          else {

            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }








}
