import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isAuth ;


  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  this.auth.isAuth$.subscribe(
    (bool:boolean)=>{
      this.isAuth=bool
    }
)
  }

  logout(){
    this.auth.logoutUser();
    window.location.reload();
  }
}
