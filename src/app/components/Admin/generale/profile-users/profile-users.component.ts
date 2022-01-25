import { Component, OnInit } from '@angular/core';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { Magasin } from 'src/app/models/magasin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.component.html',
  styleUrls: ['./profile-users.component.css']
})
export class ProfileUsersComponent implements OnInit {
  InfoUSer
  magasin : Magasin[];
  magasinSub:Subscription;
  infoMag;

  infoProfile;

  constructor(private magasinservice:MagasinService) {

    const data = JSON.parse(localStorage.getItem('auth'))
    this.InfoUSer=data['data']
  }
  ngOnInit(): void {
    this.infoMag = JSON.parse(localStorage.getItem('listeMagasins'))
      if (this.infoMag) {
        this.infoProfile=this.infoMag

      }

  }

}
