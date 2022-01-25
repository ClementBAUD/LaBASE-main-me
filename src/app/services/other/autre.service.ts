import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { Statutcompts } from './../../models/statutcompts';
import { StatutCommmande } from './../../models/statut-commmande';
@Injectable({
  providedIn: 'root'
})
export class AutreService {

  private api = environment.api;
  statutcompte:Statutcompts[];
  statutcomptes$= new Subject<Statutcompts[]>()

  listdejaInscrit
  listdejaInscrit$= new Subject<Statutcompts[]>()

  statutcommande:StatutCommmande[];
  statutcommande$= new Subject<StatutCommmande[]>()

  nbreEtuByMag;
  nbreEtuByMag$= new Subject()

  nbreComByMag;
  nbreComByMag$= new Subject()

  nbreComByMagDay;
  nbreComByMagDay$= new Subject()

  nbreComNoByMag;
  nbreComNoByMag$= new Subject()

  nbreComNoByMagDay;
  nbreComNoByMagDay$= new Subject()

  nbreProdByMagDay;
  nbreProdByMagDay$= new Subject()

  nbreProdByMag;
  nbreProdByMag$= new Subject()

  commandeNovalideDay;
  commandeNovalideDay$= new Subject()

  commandeencours;
  commandeencours$= new Subject()

  addparams;
  addparams$= new Subject();

  listeparams:[];
  listeparams$= new Subject();

  paramsListe:[];
  paramsListe$= new Subject();


  constructor(private http:HttpClient,private router:Router) { }

  emitListdejaInscrit() {
    this.listdejaInscrit$.next(this.listdejaInscrit)
  }

  emitCompte() {
    this.statutcomptes$.next(this.statutcompte)
  }

  emitListeParams() {
    this.listeparams$.next(this.listeparams)
  }

  emitParamsListe() {
    this.paramsListe$.next(this.paramsListe)
  }


  emitParams() {
    this.addparams$.next(this.addparams)
  }
  emitCommandeEncours() {
    this.commandeencours$.next(this.commandeencours)
  }

  emitNombreEtu() {
    this.nbreEtuByMag$.next(this.nbreEtuByMag)
  }

  emitNombreCom() {
    this.nbreComByMag$.next(this.nbreComByMag)
  }

  emitNbreProdByMag() {
    this.nbreProdByMag$.next(this.nbreProdByMag)
  }


  emitNbreProdByMagDay() {
    this.nbreProdByMagDay$.next(this.nbreProdByMagDay)
  }

  emitNombreComNo() {
    this.nbreComNoByMag$.next(this.nbreComNoByMag)
  }

  emitCommande() {
    this.statutcommande$.next(this.statutcommande)
  }

    // nombre de commande par jour
    emitNombreComDay() {
      this.nbreComByMagDay$.next(this.nbreComByMagDay)
    }

    // nombre de commande non recup par jour
    emitNombreComNoDay() {
      this.nbreComNoByMagDay$.next(this.nbreComNoByMagDay)
    }

    // nombre de produit par jour
    emitcommandeNovalideDay() {
      this.commandeNovalideDay$.next(this.commandeNovalideDay)
    }

  // liste de tous les statut
  getStatutCompte(){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})



     this.http.get(this.api+'statutcompt',{headers:yourHeader}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
                this.statutcompte=datas["data"]
                this.emitCompte();
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

  // liste de tous les statut commandes
  getStatutCommande(){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})



     this.http.get(this.api+'statutcommande',{headers:yourHeader}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
                this.statutcommande=datas["data"]
                this.emitCommande();
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

  // nombre de commandes
  getNbreCommande(idmagasin){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})
     const params = new HttpParams()
     .set('idmagasin', idmagasin)



     this.http.get(this.api+'listcommande/nombre-commande-magasin',{headers:yourHeader,params:params}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {

              this.nbreComByMag=datas["data"]
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
   getNbreEtudiant(idmagasin){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
      .set('idmagasin', idmagasin)




     this.http.get(this.api+'listcommande/nombre-etudiant-magasin',{headers:yourHeader,params:params}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
              this.nbreEtuByMag=datas["data"]

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

    // nombre de commande non recup
  getNbreComNo(idmagasin){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})

       const params = new HttpParams()
     .set('idmagasin', idmagasin)




       this.http.get(this.api+'listcommande/nombre-commande-non-recup-magasin',{headers:yourHeader,params:params}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {
                  this.nbreComNoByMag=datas["data"]
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

//// du jour

    // nombre de commandes par jour
    getNbreCommandeDay(idmagasin){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})
      const params = new HttpParams()
      .set('idmagasin', idmagasin)



      this.http.get(this.api+'listcommande/nombre-commande-magasin-jour',{headers:yourHeader,params:params}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {

                this.nbreComByMagDay=datas["data"]
                this.emitNombreComDay();

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

    // nombre de produit par jour
    getNbreProduitDay(idmagasin){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      const params = new HttpParams()
    .set('idmagasin', idmagasin)




      this.http.get(this.api+'listcommande/nombre-produit-magasin-jour',{headers:yourHeader,params:params}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {
                console.log(datas)
                  this.nbreProdByMagDay=datas["data"]
                  this.emitNbreProdByMagDay();
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
    getNbreComNoDay(idmagasin){
        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
        Authorization: `${data.token}`})

        const params = new HttpParams()
      .set('idmagasin', idmagasin)




        this.http.get(this.api+'listcommande/nombre-commande-non-recup-jour',{headers:yourHeader,params:params}).subscribe(
            (datas)=>{
                if (datas["statut"] == true) {
                    this.nbreComNoByMagDay=datas["data"]
                    this.emitNombreComNoDay();
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
    getNbreComEncours(idmagasin){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      const params = new HttpParams()
    .set('idmagasin', idmagasin)




      this.http.get(this.api+'listcommande/nombre-commande-Encours-jour',{headers:yourHeader,params:params}).subscribe(
          (datas)=>{
              if (datas["statut"] == true) {
                  this.commandeNovalideDay=datas["data"]
                  this.emitcommandeNovalideDay();
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

   // add contrainte

   addContrainte(nom,nombre) {
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     return new Promise((resolve, reject) => {
      this.http.post(this.api + 'parametre/creation', {nom:nom,nombre:nombre},{headers:yourHeader}).subscribe(
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
            let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);
          }

        }
      )
    })
  }

   // liste contrainte
   getContrainte(){
    const data = JSON.parse(localStorage.getItem('auth'))


    this.http.get(this.api+'parametre/liste').subscribe(
      (datas)=>{

          if (datas["statut"] == true) {
              this.listeparams=datas["data"]
              this.emitListeParams();
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

  getdejaInscrit(userId){
    let data ={
      userId:userId
    }

    this.http.post(this.api+'users/dejaInscrit',data).subscribe(
      (datas)=>{

          if (datas["statut"] == true) {
            if (datas["data"]==null) {
              this.listdejaInscrit=[]
              this.emitListdejaInscrit();
            } else {
              this.listdejaInscrit=datas["data"]
              this.emitListdejaInscrit();
            }

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

  //

   //modif containte

   ModifContrainte(id,nom,nombre) {

    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

    let datas={
      id:id,
      nom:nom,
      nombre:nombre
     }
     return new Promise((resolve, reject) => {
      this.http.post(this.api + 'parametre/update', datas,{headers:yourHeader}).subscribe(
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
            let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);
          }
        }
      )
    })
  }

   // liste get contrainte
   getContraintebyId(id){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('id', id)

    this.http.get(this.api+'parametre/liste',{headers:yourHeader,params:params}).subscribe(
      (datas)=>{

          if (datas["statut"] == true) {
              this.paramsListe=datas["data"]
              this.emitParamsListe();
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
