import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import * as Bowser from "bowser";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'push-notification';
  message;
  userAgentDetails;


  constructor(private messagingService: MessagingService) {

   }


  ngOnInit(): void {

     let  userAgent = Bowser.parse(window.navigator.userAgent);
    let  browser = Bowser.getParser(window.navigator.userAgent);
    this.userAgentDetails = JSON.stringify(userAgent, null, 4);
    const userAgent1 = window.navigator.userAgent;
    console.log(userAgent1);

  }


  pushSubscription(browser,notif) {

    //this.messagingService.requestPermission(browser,notif)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
}

myBrowser() {

  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
      return  this.pushSubscription("Opera",'Notification') ;

  }else if(navigator.userAgent.indexOf("Chrome") != -1 ){

      return this.pushSubscription("Chrome",'Notification')  ;
  }else if(navigator.userAgent.indexOf("Safari") != -1){

      return this.messagingService.requestIos('Safari','SMS') ;
  }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
       return this.pushSubscription("Firefox",'Notification') ;

  } else {
     return this.pushSubscription("Autre",'Notification')

  }

}

}
