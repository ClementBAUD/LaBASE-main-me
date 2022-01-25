import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

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
