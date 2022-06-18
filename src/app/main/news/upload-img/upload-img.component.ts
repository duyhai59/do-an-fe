import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadImgService } from './upload-img.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  ngOnInit(): void {
    
  }

  isVisible = false;

  constructor(private uploadImageService: UploadImgService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.uploadImageService.uploadMultiImages({ content: {albumId: 1}}, this.fileListAsArray);
  }

  beforeUpload(file){
    console.log("999999999999999999999999999999")
    // const reader = new FileReader();

    // reader.onload = e => {
    //     console.log(e.target.result);
    // };
    // reader.readAsText(file);
}

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  // action(file){
  //   console.log("action non", file)
  //   return ""
  // }

  selectedImages: any;
  fileListAsArray = [];
  urls = [];
  onSelectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.selectedImages = e.target.files;
      const listAsArray = Array.from(this.selectedImages);
      for (let j = 0; j < listAsArray.length; j++) {
        this.fileListAsArray.push(listAsArray[j]);
      }

      for (let i = 0; i < this.selectedImages.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
        }
      }
    }
  }

  deleteImage(i: any) {
    this.fileListAsArray.splice(i, 1);
    this.urls.splice(i, 1);
  }

}
