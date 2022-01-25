import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-liste-etudiants',
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.css']
})
export class ListeEtudiantsComponent implements OnInit {

  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 8;
  data: Country[];


  title = 'angulardatatables';
  dtOptions: any = {};


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Country[]>('./../../../../../assets/countries.json')
      .subscribe((data: Country[]) => {
        this.data = data;

      });

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

}
