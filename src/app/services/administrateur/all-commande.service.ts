import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
  import { NavigationExtras, Router } from '@angular/router';
  import { Subject } from 'rxjs';
  import { Data } from 'src/app/models/data';
  import { environment } from 'src/environments/environment';
  import { Statutcompts } from './../../models/statutcompts';
  import { StatutCommmande } from './../../models/statut-commmande';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';

@Injectable({
  providedIn: 'root'
})
export class AllCommandeService {

    private api = environment.api;


    nbreEtu;
    nbreEtu$= new Subject()

    nbreEtuAtt;
    nbreEtuAtt$= new Subject()

    nbreCom;
    nbreCom$= new Subject()

    nbreComNo;
    nbreComNo$= new Subject()

    nbreProd;
    nbreProd$= new Subject()

    graphCom;
    graphCom$= new Subject()

    graphComD;
    graphComD$= new Subject()


    constructor(private http:HttpClient,private router:Router) { }

    emitGraph() {
      this.graphCom$.next(this.graphCom)

    }
    emitGraphdate() {
      this.graphComD$.next(this.graphComD)
    }

    emitNombreEtuAtt() {
      this.nbreEtuAtt$.next(this.nbreEtuAtt)
    }

    emitNombreEtu() {
      this.nbreEtu$.next(this.nbreEtu)
    }

    emitNombreCom() {
      this.nbreCom$.next(this.nbreCom)
    }

    emitNbreProd() {
      this.nbreProd$.next(this.nbreProd)
    }

    emitNombreComNo() {
      this.nbreComNo$.next(this.nbreComNo)
    }


    // nombre de commandes
    getNbreCommande(){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})


       this.http.get(this.api+'listcommande/nombre-commande',{headers:yourHeader}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {

                this.nbreCom=datas["data"]
                this.emitNombreCom();

              }else{
                console.log(datas["message"])
              }
          },(err)=>{


            if (typeof err.error["error"]) {

              let message =err.error["message"]
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);

            }else{
              let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);
            }
          }
        )
    }

     // nombre de Etudinat
     getNbreEtudiant(){

      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})



       this.http.get(this.api+'listcommande/nombre-etudiant',{headers:yourHeader}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {
                this.nbreEtu=datas["data"]

                this.emitNombreEtu();
              }else{
                console.log(datas["message"])
              }
          },(err)=>{


            if (typeof err.error["error"]) {

              let message =err.error["message"]
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);

            }else{
              let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);
            }
          }
        )
    }

    getNbreEtudiantAttent(){

      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})



       this.http.get(this.api+'listcommande/nombre-etudiant-statut',{headers:yourHeader}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {
                this.nbreEtuAtt=datas["data"]

                this.emitNombreEtuAtt();
              }else{
                console.log(datas["message"])
              }
          },(err)=>{


            if (typeof err.error["error"]) {

              let message =err.error["message"]
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);

            }else{
              let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);
            }
          }
        )
    }

      // nombre de commande non recup
    getNbreComNo(){
        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
         Authorization: `${data.token}`})



         this.http.get(this.api+'listcommande/nombre-commande-nonrecup',{headers:yourHeader}).subscribe(
            (datas)=>{
                if (datas["statut"] == true) {
                    this.nbreComNo=datas["data"]
                    this.emitNombreComNo();
                }else{
                  console.log(datas["message"])
                }
            },(err)=>{


              if (typeof err.error["error"]) {

                let message =err.error["message"]
                const navigationExtras: NavigationExtras = {state: {data: message}};
                this.router.navigate(['/'], navigationExtras);

              }else{
                let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                const navigationExtras: NavigationExtras = {state: {data: message}};
                this.router.navigate(['/'], navigationExtras);
              }
            }
          )
      }

       // nombre de produits
    getNbreProduit(){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})


       this.http.get(this.api+'listcommande/nombre-produit',{headers:yourHeader}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {

                this.nbreProd=datas['data']

                this.emitNbreProd();

              }else{
                console.log(datas["message"])
              }
          },(err)=>{


            if (typeof err.error["error"]) {

              let message =err.error["message"]
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);

            }else{
              let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
              const navigationExtras: NavigationExtras = {state: {data: message}};
              this.router.navigate(['/'], navigationExtras);
            }
          }
        )
    }

       // nombre de produits
    getGraphcom(){
        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
         Authorization: `${data.token}`})


         this.http.get(this.api+'listcommande/graph-dernier-mois',{headers:yourHeader}).subscribe(
            (datas)=>{
                if (datas["statut"] == true) {

                  this.graphCom=datas["data"]
              /*   console.log(datas["data"])
                 if (datas["data"].length ===0) {
                  this.graphComD=[]
                 this.graphCom=[]
                  this.emitGraph();
                  this.emitGraphdate()
                 }


                 datas["data"].forEach(element => {
                  this.graphComD=element["dCreat"]
                  this.graphCom=element["nobreCommande"]

                });
                console.log("valider") */
                this.emitGraph();
              //  this.emitGraphdate()
                }else{
                  console.log(datas["message"])
                }
            },(err)=>{


              if (typeof err.error["error"]) {

                let message =err.error["message"]
                const navigationExtras: NavigationExtras = {state: {data: message}};
                this.router.navigate(['/'], navigationExtras);

              }else{
                let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                const navigationExtras: NavigationExtras = {state: {data: message}};
                this.router.navigate(['/'], navigationExtras);
              }
            }
          )
      }


  }


