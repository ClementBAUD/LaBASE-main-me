import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { Statutcompts } from './../../models/statutcompts';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private api = environment.api;

  produits:Produits[];
  produits$= new Subject<Produits[]>()

  produit:Produits[];
  produit$= new Subject<Produits[]>()

  produitplu:Produits[];
  produitplu$= new Subject<Produits[]>()

  famille:Famille[];
  famille$= new Subject<Famille[]>()




  constructor(private http:HttpClient,private router:Router) { }

  emitProduits() {
    this.produits$.next(this.produits)
  }

  emitProduitPlu() {
    this.produitplu$.next(this.produitplu)
  }

  emitProduit() {
    this.produit$.next(this.produit)
  }

  emitFamille() {
    this.famille$.next(this.famille)
  }

   // liste de tous les produits
   getProduits(){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

    this.http.get(this.api+'produit/all',{headers:yourHeader}).subscribe(
      (datas)=>{

          if (datas["statut"] == true) {
              this.produits=datas["data"]['rows']
              this.emitProduits();
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

    //creation produits

    // creation magasin
  creationProduist(data) {
      const datas = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${datas.token}`})

      return new Promise((resolve, reject) => {
        this.http.post(this.api + 'produit/creation', data,{headers:yourHeader}).subscribe(
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

    // detail produit

    getProduitId(id:string){
      const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})

       const params = new HttpParams()
             .set('id', id)

       this.http.get(this.api+'produit/all',{headers:yourHeader,params:params}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
                this.produit=datas["data"]
                this.emitProduit();
            }else{
              console.log(datas)
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

  // update produit
  updateProduit(data){

    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'produit/updateproduit', data,{headers:yourHeader}).subscribe(
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

  // update image
  updateProduitImage(data){

    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'produit/updateImage', data,{headers:yourHeader}).subscribe(
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

  //liste famille de produits

  getFamilles(){
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    this.http.get(this.api+'famille',{headers:yourHeader}).subscribe(
      (datas)=>{

          if (datas["statut"] == true) {
              this.famille=datas["data"]['rows']
              this.emitFamille();
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

  // delete produits

  deleteProduit(data){
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'produit/updateImage', data,{headers:yourHeader}).subscribe(
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

  // rechercher des produits par plu

  getProduitplu(plu){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('plu', plu)

           return new Promise((resolve, reject) => {
            this.http.get(this.api + 'produit/produit',{headers:yourHeader,params:params}).subscribe(
              (data) => {
                if (data["statut"] == true) {
                  resolve(data)
                }
                else {

                  reject(data)
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
