import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { Produits } from 'src/app/models/produits';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css']
})
export class ListProduitsComponent implements OnInit {
  page = 1;
  pageSize = 20000;
  collectionSize: number;
  currentRate = 8;

  succesMessage:string;

  listeProduit : Produits[];
  listeProduitSub:Subscription;

  Loading:boolean;

  iddelete;

  title = 'Liste des produits';
  dtOptions: any = {};

  constructor(private http: HttpClient,private produitsService:ProduitsService,private router:Router,private modalService: NgbModal) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string};
      this.succesMessage = state.data;
    }
   }


  ngOnInit(): void {

    this.listeProduitSub= this.produitsService.produits$.subscribe(
      (userAl:Produits[])=>{
          this.listeProduit =userAl
          if (this.listeProduit.length>0) {
            this.Loading=true;
          }else{

            setTimeout(function(){
              this.Loading=true;
            }, 1000);
          }

          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
       // console.log(err)
      }
    );

    this.produitsService.getProduits();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'print'
        ]
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listeProduitSub.unsubscribe();
  }

  openDelete(targetModal, produit) {
    this.iddelete = produit.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
  //  console.log( this.iddelete  )
    this.modalService.dismissAll();
/*     const deleteURL = 'http://localhost:8888/friends/' + this.deleteID + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }); */
  }
}
