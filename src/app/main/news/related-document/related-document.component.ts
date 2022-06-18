import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-related-document',
  templateUrl: './related-document.component.html',
  styleUrls: ['./related-document.component.scss']
})
export class RelatedDocumentComponent implements OnInit {

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
