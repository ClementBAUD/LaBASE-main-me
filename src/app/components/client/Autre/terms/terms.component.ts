import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  isUser;
  isMag:boolean;
  isAdmin:boolean;
  warnmessage:string;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
   // this.auth.isAuth$
   let data= JSON.parse(localStorage.getItem('auth'))
   let mag= JSON.parse(localStorage.getItem('magasin'))
   this.isUser=data["data"]

  }

}
