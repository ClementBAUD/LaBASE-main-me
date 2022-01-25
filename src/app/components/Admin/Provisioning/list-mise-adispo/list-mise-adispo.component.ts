import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { Produits } from 'src/app/models/produits';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';

@Component({
  selector: 'app-list-mise-adispo',
  templateUrl: './list-mise-adispo.component.html',
  styleUrls: ['./list-mise-adispo.component.css'],
})
export class ListMiseADispoComponent implements OnInit {
  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 8;

  succesMessage: string;
  errorMessage: string;
  formData = new FormData();

  listeProduit: Produits[];
  listeProduitSub: Subscription;

  Loading: boolean;

  iddelete;

  title = 'Liste des produits Disponible';
  dtOptions: any = {};
  constructor(
    private http: HttpClient,
    private produitMiseDispoService: ProduitMiseDispoService,
    private router: Router,
    private modalService: NgbModal
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as { data: string };
      this.succesMessage = state.data;
    }
  }

  ngOnInit(): void {
    this.listeProduitSub = this.produitMiseDispoService.produits$.subscribe(
      (res: Produits[]) => {
        this.listeProduit = res;
        this.Loading = true;
      },
      (err) => {
        this.Loading = false;
        // console.log(err)
      }
    );
    const data = JSON.parse(localStorage.getItem('mag'));
    let idMagasin = data[0].id;

    this.produitMiseDispoService.getProduitDispo(idMagasin);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['csv', 'excel', 'print'],
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeProduitSub.unsubscribe();
  }

  openDelete(targetModal, produit) {
    this.iddelete = produit.id_prodDispo;

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  onDelete() {
    this.modalService.dismissAll();

    this.formData.append('id', this.iddelete);
    this.formData.append('userId', '1');

    this.produitMiseDispoService
      .deleteProduit(this.formData)
      .then((data) => {
        this.succesMessage = data['message'];

        this.modalService.dismissAll();
        window.location.reload();
      })
      .catch((err) => {
        this.errorMessage = err;
      });
  }
}
