import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() {  this.loadScript()}

  ngOnInit(): void {
  }

  loadScript() {

    const dynamicScripts = [
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Frontend/vendor/OwlCarousel/owl.carousel.js",
      "assets/Frontend/vendor/semantic/semantic.min.js",
      "assets/Frontend/js/jquery.countdown.min.js",
      "assets/Frontend/js/custom.js",
      "assets/Frontend/js/offset_overlay.js",
      "assets/Frontend/js/night-mode.js",

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
