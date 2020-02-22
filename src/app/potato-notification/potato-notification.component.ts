import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-potato-notification',
  templateUrl: './potato-notification.component.html',
  styleUrls: ['./potato-notification.component.scss'],
})
export class PotatoNotificationComponent implements OnInit {

	@Input() message:string;
  constructor() { }

  ngOnInit() {}

}
