import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { Statutcompts } from './../../models/statutcompts';
import { Commandes } from 'src/app/models/commandes';
import { Famille } from 'src/app/models/famille';
import { AuthService } from '../authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private api = environment.api;

  commandeMagday:Commandes[];
  commandeMagday$= new Subject<Commandes[]>()

  commandeMagAll:Commandes[];
  commandeMagAll$= new Subject<Commandes[]>()

  commandeDetail;
  commandeDetail$= new Subject<[]>()

  commandeMaglastDay:Commandes[];
  commandeMaglastDay$= new Subject<Commandes[]>()

  commandeMagNoRecup:Commandes[];
  commandeMagNoRecup$= new Subject<Commandes[]>()

  commandeMaglast:Commandes[];
  commandeMaglast$= new Subject<Commandes[]>()


  commandeinfo:Commandes[];
  commandeinfo$= new Subject<Commandes[]>()

  // commmabde client
  commandePasseclient:Commandes[];
  commandePasseclient$= new Subject<Commandes[]>()

  // non récupere
  commandeNoRecupclient:Commandes[];
  commandeNoRecupclient$= new Subject<Commandes[]>()
  // detail commande  en cours
  commandeToDayclient:Commandes[];
  commandeToDayclient$= new Subject<Commandes[]>()
  ///detail commande
  commandeShowlient:Commandes[];
  commandeShowlient$= new Subject<Commandes[]>()

  constructor(private http:HttpClient,private router :Router,private auth:AuthService) { }

  emitcommandePasseclient() {
    this.commandePasseclient$.next(this.commandePasseclient)
  }

  emitcommandeToDayclient() {
    this.commandeToDayclient$.next(this.commandeToDayclient)
  }

  emitCommandeNoRecupclient() {
    this.commandeNoRecupclient$.next(this.commandeNoRecupclient)
  }

  emitCommandeShowlient() {
    this.commandeShowlient$.next(this.commandeShowlient)
  }



  emitcommandeinfo() {
    this.commandeinfo$.next(this.commandeinfo)
  }


  emitcommandeMaglast() {
    this.commandeMaglast$.next(this.commandeMaglast)
  }

  emitcommandeMagNoRecup() {
    this.commandeMagNoRecup$.next(this.commandeMagNoRecup)
  }

  emitCommandeMagday() {
    this.commandeMagday$.next(this.commandeMagday)
  }

  emitcommandeMagAll() {
    this.commandeMagAll$.next(this.commandeMagAll)
  }

  emitcommandeMaglastDay() {
    this.commandeMaglastDay$.next(this.commandeMaglastDay)
  }

  emitcommandeDetail() {
    this.commandeDetail$.next(this.commandeDetail)
  }


  getCommandeMagasinDay(idMagasin:string){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('idmagasin', idMagasin)

     this.http.get(this.api+'listcommande/magasin-jour',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{
          if (datas["statut"] == true) {
              
              this.commandeMagday=datas["data"]
              this.emitCommandeMagday();
          }else{
            console.log(datas)

          }
      },(err)=>{
        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  getCommandeMagasinAll(idMagasin:string){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('idmagasin', idMagasin)

     this.http.get(this.api+'listcommande/magasin-commande',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{
          if (datas["statut"] == true) {
              this.commandeMagAll=datas["data"]
              this.emitcommandeMagAll();
          }else{
            console.log(datas)

          }
      },(err)=>{
        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  getCommandeMagasinANonRecup(idmagasin:string){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('idmagasin', idmagasin)

     this.http.get(this.api+'listcommande/nombre-commande-non-recup-mag',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{
          if (datas["statut"] == true) {
              this.commandeMagNoRecup=datas["data"]
              this.emitcommandeMagNoRecup();
          }else{
            console.log(datas)
          }
      },(err)=>{
        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  getDetailCommand(id:string,idMagasin:string){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('id', id)
           .set('idmagasin', idMagasin)

     this.http.get(this.api+'listcommande/detail-commande',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{
          if (datas["statut"] == true) {
              this.commandeDetail=datas["data"]
              this.emitcommandeDetail();

          }
      },(err)=>{
        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  getInfoCommand(idcommade:string){

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('idcommade', idcommade)

     this.http.get(this.api+'commande/info_commande',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{
          if (datas["statut"] == true) {

              this.commandeinfo=datas["Data"]
              this.emitcommandeinfo();
          }else{
            console.log(datas)
          }
      },(err)=>{
        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  changeStatutCommande(data) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'commande/update', data,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {
            resolve(data)
          }
          else {

            reject(data['message'])
          }

        }, (err) => {
          if (err['error']['message']=="veuillez vous connecter à nouveau.") {
            this.auth.logoutUser()
            const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
            this.router.navigate(['/'], navigationExtras);
          } else {
            reject(err.error.message)
          }

        }
      )
    })

  }



  /// commande client
}
