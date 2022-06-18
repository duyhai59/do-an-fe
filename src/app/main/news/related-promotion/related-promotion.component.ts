import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-related-promotion',
  templateUrl: './related-promotion.component.html',
  styleUrls: ['./related-promotion.component.scss']
})
export class RelatedPromotionComponent implements OnInit {

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
