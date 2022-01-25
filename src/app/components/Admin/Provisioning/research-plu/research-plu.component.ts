import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { Produits } from 'src/app/models/produits';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-research-plu',
  templateUrl: './research-plu.component.html',
  styleUrls: ['./research-plu.component.css'],
})
export class ResearchPluComponent implements OnInit {
  ProductForm;
  errorMessage: string;
  succesMessage: string;
  submitted = false;
  formData = new FormData();
  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;

  listeProduit: Produits[];
  listeProduitSub: Subscription;

  Loading: boolean;

  iddelete;

  title = 'Liste des produits';
  dtOptions: any = {};

  constructor(
    private fromBuilder: FormBuilder,
    private http: HttpClient,
    private produitsService: ProduitsService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.ProductForm = this.fromBuilder.group({
      plu: ['', [Validators.required]],
    });
  }

  get plu() {
    return this.ProductForm.get('plu');
  }

  ngOnInit(): void {



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['csv', 'excel', 'print'],
    };
  }

  openDelete(targetModal, produit) {
    this.iddelete = produit.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  onDelete() {
    this.modalService.dismissAll();
    /*     const deleteURL = 'http://localhost:8888/friends/' + this.deleteID + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }); */
  }

  onSubmit() {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    const plu = this.ProductForm.get('plu').value;

    this.produitsService.getProduitplu(plu)
    .then((datas:any) => {

      if (datas['data']['rows']?.length>0) {

        this.listeProduit = datas['data']['rows'];
      } else {
        this.listeProduit =[]
        this.errorMessage="Aucun produit ne correspond au PLU indiqué. "
      }


        this.Loading = true;
    })
    .catch((err) => {

      this.errorMessage = err;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   // this.listeProduitSub.unsubscribe();
  }
}
