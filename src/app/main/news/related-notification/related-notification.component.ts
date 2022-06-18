import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-related-notification',
  templateUrl: './related-notification.component.html',
  styleUrls: ['./related-notification.component.scss']
})
export class RelatedNotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
