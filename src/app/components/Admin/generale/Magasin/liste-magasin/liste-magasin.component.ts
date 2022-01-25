import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Magasin } from 'src/app/models/magasin';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-liste-magasin',
  templateUrl: './liste-magasin.component.html',
  styleUrls: ['./liste-magasin.component.css']
})
export class ListeMagasinComponent implements OnInit {

  magasinsList : Magasin[];
  magasinSubList:Subscription;

  Loading:boolean;
  page = 1;
  pageSize = 50;
  collectionSize: number;
  currentRate = 8;



  title = 'Liste des Etudiants';
  dtOptions: any = {};

  constructor(private magasinservice:MagasinService,private router:Router) { }

  ngOnInit(): void {
    //intialisation du formulaire

    //recuperation des magasins
    this.magasinSubList= this.magasinservice.magasins$.subscribe(
      (mag:Magasin[])=>{
          this.magasinsList =mag
          this.Loading=true;
          console.log(this.magasinsList);
      },
      (err)=>{
        this.Loading=false;
        console.log(err)
      }
    );

    this.magasinservice.getMagasins();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'print'
        ]
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.magasinSubList.unsubscribe();
  }

}
