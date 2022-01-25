import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProduitDispo } from 'src/app/models/produit-dispo.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CartservicesService {
    private api = environment.api;

    constructor(
        private toastr: ToastrService,
        private http: HttpClient,
        private router: Router
    ) { }

    addToCart(data: ProduitDispo): void {
        let arrayFromStroage = JSON.parse(localStorage.getItem('avct_item'));
        let arrayLength;
        let validation = 0;

        if (arrayFromStroage) {
            arrayLength = arrayFromStroage.length;
        } else {
            arrayLength = 0;
        }

        let contraintes = JSON.parse(localStorage.getItem('contrainte'));
        let qt;
        let qtParProduit;
        contraintes.forEach(function (element, index) {
            if (element.nom == 'limite_produit_panier') {
                qt = element.nombre;
            }
            if (element.nom == 'quantite_produit') {
                qtParProduit = element.nombre;
            }
        });

        let nbProduitsPanier = parseInt(arrayLength);
        let maxProduitsTotal = parseInt(qt);
        let maxQteParProduit = parseInt(qtParProduit);
        let qteProduitIdentique = 0;
        if (arrayLength != 0) {
            arrayFromStroage.forEach(function (element, index) {
                if (element.id_prodDispo == data.id_prodDispo) {
                    qteProduitIdentique++;
                }
            });

            if (nbProduitsPanier >= maxProduitsTotal) {
                this.toastr.error(
                    "vous avez atteint la limite totale de " + maxProduitsTotal + " produits dans votre panier",
                    "Le produit n'a pas pu être ajouté"
                );
            } else if (qteProduitIdentique >= maxQteParProduit) {
                this.toastr.error(
                    "vous avez atteint la limite de " + maxQteParProduit + " produits identiques dans votre panier",
                    "Le produit n'a pas pu être ajouté"
                );
            } else {
                const a: ProduitDispo[] = JSON.parse(localStorage.getItem('avct_item')) || [];
                a.push(data);
                this.toastr.success('Produit ajouté au panier !', '');
                localStorage.setItem('avct_item', JSON.stringify(a));
            }
        } else {
            const a: ProduitDispo[] = JSON.parse(localStorage.getItem('avct_item')) || [];
            a.push(data);
            this.toastr.success('Produit ajouté au panier !', '');
            localStorage.setItem('avct_item', JSON.stringify(a));
    }

        // if (nbProduitsPanier < maxProduitsTotal) {
        //     if (arrayLength != 0) {

        //         // var index = -1;
        //         // var filteredObj = arrayFromStroage.find(function(item, i){
        //         //   if(item.id_prodDispo == data.id_prodDispo){
        //         //     index = item.id_prodDispo;
        //         //     return index;
        //         //   }

        //         // });


        //         /*  console.log(index);

        //          arrayFromStroage.forEach(function (element, index) {
        //            let id_prodDispo = parseInt(element.id_prodDispo);
        //            if (data.id_prodDispo == id_prodDispo) {
        //              validation = 1;
        //            } else {
        //              validation = 0;
        //            }
        //          }); */

        //         // if (index != -1) {
        //         //   this.toastr.warning(
        //         //     'il est déjà dans votre panier',
        //         //     "Le produit n'a pas pu être ajouté"
        //         //   );
        //         // } else if (index == -1) {
        //         const a: ProduitDispo[] = JSON.parse(localStorage.getItem('avct_item')) || [];
        //         a.push(data);
        //         this.toastr.success('Produit ajouté au panier !', '');
        //         localStorage.setItem('avct_item', JSON.stringify(a));

        //         // }
        //     } else if (arrayLength === 0) {
        //         var index = -1;
        //         if (index == -1) {

        //             const a: ProduitDispo[] = JSON.parse(localStorage.getItem('avct_item')) || [];
        //             a.push(data);
        //             this.toastr.success('Produit ajouté au panier !', '');
        //             localStorage.setItem('avct_item', JSON.stringify(a));

        //         } else {
        //             this.toastr.warning(
        //                 'il est déjà dans votre panier',
        //                 "Le produit n'a pas pu être ajouté"
        //             );
        //         }
        //     }
        // } else {
        //     this.toastr.error(
        //         "Le produit n'a pas pu être ajouté",
        //         'vous aviez atteint la limite autorisée'
        //     );
        // }
    }

    // Removing cart from local
    removeLocalCartProduct(product: ProduitDispo) {
        const products: ProduitDispo[] = JSON.parse(
            localStorage.getItem('avct_item')
        );

        for (let i = 0; i < products.length; i++) {
            if (products[i].id_prodDispo === product.id_prodDispo) {
                products.splice(i, 1);
                break;
            }
        }
        // ReAdding the products after remove
        localStorage.setItem('avct_item', JSON.stringify(products));
    }

    // Fetching Locat CartsProducts
    getLocalCartProducts(): ProduitDispo[] {
        const products: ProduitDispo[] =
            JSON.parse(localStorage.getItem('avct_item')) || [];
        let arrayLength;
        if (products) {
            arrayLength = products.length;
        } else {
            arrayLength = 0;
        }
        return arrayLength;
    }

    getCartProducts(): ProduitDispo[] {
        const products: ProduitDispo[] =
            JSON.parse(localStorage.getItem("avct_item")) || [];
        products.sort(((p1,p2) => this.compareString(p1.libelle, p2.libelle)));
        return products;
    }

    compareString(s1: string, s2: string): number {
        if (s1 == "") return 1;
        if (s2 == "") return -1;
        if (s1 <= s2) return -1;
        if (s1 > s2) return 1;
        return -1;
    }

    //get size cart actuel
    getsizecart() {
        let arrayFromStroage = JSON.parse(localStorage.getItem('avct_item'));
        if (arrayFromStroage) {
            let arrayLength = arrayFromStroage.length;
            return arrayLength;
        }
        let arrayLength = 0;

        return arrayLength;
    }

    removeAllCart() {
        localStorage.setItem('statut', null);
    }
}
