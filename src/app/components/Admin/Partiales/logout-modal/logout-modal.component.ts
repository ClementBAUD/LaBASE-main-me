import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {
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
    this.auth.logout();
    window.location.reload();
  }
}
