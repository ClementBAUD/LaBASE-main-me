import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mini-footer',
  templateUrl: './mini-footer.component.html',
  styleUrls: ['./mini-footer.component.css']
})
export class MiniFooterComponent implements OnInit {
  public version = environment.version;
  
  constructor() { }

  ngOnInit(): void {
  }

}
