import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CenterService } from 'app/main/center/center.service';
import Swal from 'sweetalert2';
import { DocOfficalDispatchService } from '../doc-offical-dispatch.service';

@Component({
  selector: 'app-edit-doc-offical-dispatch',
  templateUrl: './edit-doc-offical-dispatch.component.html',
  styleUrls: ['./edit-doc-offical-dispatch.component.scss']
})
export class EditDocOfficalDispatchComponent implements OnInit {

  constructor(private service:DocOfficalDispatchService,private formBuilder:FormBuilder,
              private centerService:CenterService) { }


  @Output() hiddenModalUpdate = new EventEmitter();

  editDocForm:FormGroup;
  docResult:any;
  currentFile;
  listCenter=[];

  ngOnInit(): void {
    this.initForm();
    this.retrieveDocOfficalDispatch();
    this.getCenters();
  }

  initForm(){
    this.editDocForm = this.formBuilder.group({
      numDocEn: [''],
      titleEn: [''],
      center: [''],
      iso: [undefined],
      cvNoiBo: [undefined],
      cvCham: [undefined],
      lyDoCham: [''],
      contentEn: [''],
      utSearch: [undefined],
      createdTime: [undefined],
      beginPublish: [undefined],
      cvSource: [undefined]
    }),
    (document.getElementById('uploadDoc') as HTMLInputElement).disabled = true;
  }

  getCenters(){
    let params={method:'GET'}
    this.centerService.getAll(params).then(data=>{
      if(data.code == 0){
        this.listCenter = JSON.parse(JSON.stringify(data.content));
      }else{
        this.listCenter = [];
      }
    })
  }

  fillData(data:any){
    this.editDocForm.patchValue({
      numDocEn: data.numDocEn,
      titleEn: data.titleEn,
      center: (data.center).toString(),
      iso: (data.iso==1)?true:false,
      cvNoiBo: (data.cvNoiBo==1)?true:false,
      cvCham: (data.cvCham==1)?true:false,
      lydoCham: data.lyDoCham,
      contentEn: data.contentEn,
      utSearch: (data.utSearch==1)?true:false,
      createdTime: data.createdTime,
      beginPublish: data.beginPublish,
      cvSource: (data.cvSource).toString(),
    }),
    (document.getElementById('currentDoc') as HTMLInputElement).checked = true;
  }

  retrieveDocOfficalDispatch(){
    let docId = localStorage.getItem("docOfficalDispatchId");
    let params = {method: 'GET'}
    this.service.doRetrieveDocumentOfficalDispatch(params,docId).then(data=>{
      if(data.code == 0){
        this.docResult = JSON.parse(JSON.stringify(data.content));
        this.fillData(this.docResult);
      }else{
        Swal.fire({
          title: "Không tìm thấy công văn này",
          icon: "error",
          confirmButtonText: "OK",
        })
      }
    })
  }

  changeFile(event){
    if(event.target.files.length > 0){
      this.currentFile = event.target.files[0];
    }
  }

  editDocOfficalDispatch(){
    let docId = localStorage.getItem("docOfficalDispatchId");

    let formData : FormData = new FormData();
    let docOfficalDispatch = {
      'numDocEn': this.editDocForm.value.numDocEn,
      'titleEn': this.editDocForm.value.titleEn,
      'center': this.editDocForm.value.center,
      'iso': (this.editDocForm.value.iso==true)?1:0,
      'cvNoiBo': (this.editDocForm.value.cvNoiBo==true)?1:0,
      'cvCham': (this.editDocForm.value.cvCham==true)?1:0,
      'lydoCham': this.editDocForm.value.lyDoCham,
      'contentEn': this.editDocForm.value.contentEn,
      'utSearch': (this.editDocForm.value.utSearch==true)?1:0,
      'createdTime': this.editDocForm.value.createdTime,
      'beginPublish': this.editDocForm.value.beginPublish,
      'cvSource': this.editDocForm.value.cvSource,
    }

    let newDoc = (document.getElementById('newDoc') as HTMLInputElement);
    formData.append('documentOfficalDispatch',
      new Blob([JSON.stringify(docOfficalDispatch)],{
        type: 'application/json'
      }
    ));
    if(newDoc.checked == true){
      formData.append('file',this.currentFile)
    }

    if(this.validate()){
      let params = {method: 'PUT'}
      this.service.doUpdateDocumentOfficalDispatch(params,docId,formData).then(data=>{
        if(data.body.code == 0){
          Swal.fire({
            title: "Cập nhật thành công",
            icon:"success",
            confirmButtonText: "OK"
          })
          this.hiddenModalUpdate.emit(false);
        }else{
          Swal.fire({
            title: "Cập nhật thông tin không thành công!",
            icon: "error",
            confirmButtonText: "OK"
          })
        }
      })
    }
  }

  validate(){
    let isValid=true;
    let isForcus = false;

    if(this.editDocForm.value.numDocEn == null || this.editDocForm.value.numDocEn == ''){
      isValid = false;
      // this.editNumDocElement.nativeElement.focus();
      // this.numDocMessage = "Số công văn không được để trống"
    }

    if(this.editDocForm.value.title == null || this.editDocForm.value.title == ''){
      isValid == false;
    }

    return isValid;
  }

  openInputUpload(){
    (document.getElementById('uploadDoc') as HTMLInputElement).disabled = false;
  }

  closeInputUpload(){
    (document.getElementById('uploadDoc') as HTMLInputElement).disabled = true;
  }

  clearInfomationInput(){
    this.editDocForm.patchValue({
      numDocEn: "",
      titleEn: "",
      center: null,
      iso: null,
      cvNoiBo: null,
      cvCham: null,
      lydoCham: "",
      contentEn: "",
      utSearch: null,
      createdTime: null,
      beginPublish: null,
      cvSource: null,
    }),
    (document.getElementById('currentDoc') as HTMLInputElement).checked = true;
  }
}
