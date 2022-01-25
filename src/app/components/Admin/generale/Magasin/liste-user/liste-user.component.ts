import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/users/all-users.service';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {

  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 8;

  userliste : Users[];
  userlisteSub:Subscription;

  Loading:boolean;


  title = 'Liste des Etudiants';
  dtOptions: any = {};


  constructor(private http: HttpClient,private allusersService:AllUsersService) { }

  ngOnInit(): void {
    this.userlisteSub= this.allusersService.listeusersMagParticulier$.subscribe(
      (userAl)=>{
          this.userliste =userAl
          console.log(userAl)

          if (this.userliste.length>0) {
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

    const data = JSON.parse(localStorage.getItem('mag'))
  this.allusersService.listeusersMagPart(data[0].id);
    //this.allusersService.getAllUsers();

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
    this.userlisteSub.unsubscribe();
  }

  deleteuser(){
    console.log('ok');
  }


}
