import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocOfficalDispatchService } from '../doc-offical-dispatch.service';

@Component({
  selector: 'app-upload-doc-offical-dispatch',
  templateUrl: './upload-doc-offical-dispatch.component.html',
  styleUrls: ['./upload-doc-offical-dispatch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadDocOfficalDispatchComponent implements OnInit {

  constructor(private service:DocOfficalDispatchService,private formBuilder:FormBuilder,private router:Router) { }

  isSpinning=false;
  currentFile;
  importDocForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.importDocForm = this.formBuilder.group({
    })
  }
  changeFile(event){
    if(event.target.files.length > 0){
      this.currentFile = event.target.files[0];
      $("label[for='customFile']").html(this.currentFile.name);
    }
  }
  
  importFile(){
    this.isSpinning = true;
    let params = {method: 'POST'}
    this.service.uploadFileExcel(params,this.currentFile).then(data=>{
      this.isSpinning = false;
      console.log(data);
      if(data.status == 200){
        Swal.fire({
          title: 'Upload file thành công.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }else{
        Swal.fire({
          title: 'Có lỗi xảy ra, vui lòng thử lại.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
  }

  downloadSampleDocument(){
    let a = document.getElementById('download-btn') as HTMLAnchorElement;
    a.href="/assets/document/cv_sample2.xlsx";
    a.click();
  }
}
