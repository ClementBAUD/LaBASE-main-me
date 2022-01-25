import { Injectable } from '@angular/core';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { rejects } from 'assert';
import { BehaviorSubject } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {
  private api = environment.api;
  constructor(private http: HttpClient,private swPush: SwPush,private router:Router) {
}

  creationcommande(heureRecuperation,userId) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    let data={
      'heureRecuperation':heureRecuperation,
      'userId':userId
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'commande/creation_first', data,{headers:yourHeader}).subscribe(
        (resultat) => {
          //authentification
          if (resultat['statut'] == true) {
            resolve(resultat)
          }
          else {
            reject(resultat['message'])
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }

  creationlignecommande(quantite,miseadispoId,commandeId) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    let data={
      'quantite':quantite,
      'MiseADispoId':miseadispoId,
      'commandeId':commandeId
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'commande/ligne_commande', data,{headers:yourHeader}).subscribe(
        (resultat) => {
          //authentification
          if (resultat['statut'] == true) {
            resolve(resultat)
          }
          else {
            reject(resultat['message'])
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }


  // commande paste
  getcommandepaste(id:string){

    const data = JSON.parse(localStorage.getItem('auth'))

     const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      const params = new HttpParams()
            .set('iduser', id)

            return new Promise((resolve, reject) => {
              this.http.get(this.api + 'listcommande/liste-commande-magasin-users',{headers:yourHeader,params:params}).subscribe(
                (data) => {
                  if (data["statut"] == true) {
                    resolve(data)
                  }
                  else {

                    reject(data['message'])
                  }

                }, (err) => {

                  if (typeof err.error["error"]) {

                    let message =err.error["message"]
                    const navigationExtras: NavigationExtras = {state: {data: message}};
                    this.router.navigate(['/'], navigationExtras);

                  }else{
                    reject(err.error.message)
                  }
                }
              )
            })


  }

  //commande no recup
  getcommandenorecup(id:string){

    const data = JSON.parse(localStorage.getItem('auth'))

     const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      const params = new HttpParams()
            .set('iduser', id)

            return new Promise((resolve, reject) => {
              this.http.get(this.api + 'listcommande/liste-commande-non-recup',{headers:yourHeader,params:params}).subscribe(
                (data) => {
                  if (data["statut"] == true) {
                    resolve(data)
                  }
                  else {

                    reject(data['message'])
                  }

                }, (err) => {

                  if (typeof err.error["error"]) {
                    let message =err.error["message"]
                    const navigationExtras: NavigationExtras = {state: {data: message}};
                    this.router.navigate(['/'], navigationExtras);

                  }else{
                    reject(err.error.message)
                  }
                }
              )
            })


  }

}
