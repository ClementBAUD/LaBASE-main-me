import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'labase-project';

 // Push notifications plus utilisées
  private readonly publicKey ='BEqXGfa0rJ9CIUXszFD3TrcRiBhdlWGI13_Uo-QXnKCZQc4pDStignN8xW5_EkiDmspPpH4daMmj1cVoywwbFn8';

  constructor(private update: SwUpdate,private swPush: SwPush,private appRef: ApplicationRef,private toastr: ToastrService) {
    this.updateClient();
    this.checkUpdate();
  }


  ngOnInit() {

   this.pushSubscription();

    this.swPush.messages.subscribe((message) => console.log(message));
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log(notification.data);
      window.open(notification.data.url);
    });


  }

  updateClient() {
    if (!this.update.isEnabled) {
      this.toastr.warning("Imposible d'installer l'application");
      return;
    }
    this.update.available.subscribe((event) => {
      this.toastr.warning('Actuelle '+ event.current+ '. Disponible '+ event.available);
      if (confirm("Nouvelle version de l'application disponible")) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      this.toastr.warning('Actuelle '+ event.previous+ '. Disponible '+ event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => this.toastr.warning('Vérification'));
          this.toastr.warning('Vérification effectuée');
        });
      }
    });
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Les notifications ne sont pas autorisées');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
      })
      .catch((err) => console.log(err));
  }


}
