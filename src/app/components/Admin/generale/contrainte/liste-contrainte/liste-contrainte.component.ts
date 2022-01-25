import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutreService } from 'src/app/services/other/autre.service';

@Component({
  selector: 'app-liste-contrainte',
  templateUrl: './liste-contrainte.component.html',
  styleUrls: ['./liste-contrainte.component.css']
})
export class ListeContrainteComponent implements OnInit {

  paramsList : [];
  paramsListSub:Subscription;

  Loading:boolean;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;
  title = 'Liste des Etudiants';
  dtOptions: any = {};


  constructor(private autreService:AutreService,private router:Router) { }


  ngOnInit(): void {
    this.paramsListSub= this.autreService.listeparams$.subscribe(
      (mag:[])=>{
          this.paramsList =mag
          console.log(this.paramsList)
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
        console.log(err)
      }
    );

    this.autreService.getContrainte();

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
    this.paramsListSub.unsubscribe();
  }

}
