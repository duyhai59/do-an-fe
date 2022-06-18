import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CenterService } from 'app/main/center/center.service';
import Swal from 'sweetalert2';
import { DocOfficalDispatchService } from '../doc-offical-dispatch.service';

@Component({
  selector: 'app-add-doc-offical-dispatch',
  templateUrl: './add-doc-offical-dispatch.component.html',
  styleUrls: ['./add-doc-offical-dispatch.component.scss']
})
export class AddDocOfficalDispatchComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service:DocOfficalDispatchService,
              private centerService: CenterService) { }

  @ViewChild('addNumDoc') addNumDocElement : ElementRef
  
  @Output() disableModalAdd = new EventEmitter<any>();

  addDocForm: FormGroup;
  numDocMessage="";
  currentFile;

  listCenter=[]
  ngOnInit(): void {
    this.initForm();
    this.getCenters();
  }
  initForm(){
    this.addDocForm = this.formBuilder.group({
      numDocEn: ['',Validators.required],
      titleEn: ['',Validators.required],
      center: [undefined],
      iso: [undefined],
      cvNoiBo: [undefined],
      cvCham: [undefined],
      lyDoCham: [''],
      contentEn: [''],
      utSearch: [undefined],
      createdTime: [undefined],
      beginPublish: [undefined],
      cvSource: [undefined],
      file: [undefined]
    })
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

  choosenFile(event){
    if(event.target.files.length > 0){
      this.currentFile = event.target.files[0];
    }
  }

  addDocumentOfficalDispatch(){
    if(this.addDocForm.valid){
      this.addDocForm.patchValue({
        cvCham: (this.addDocForm.value.cvCham != null)?1:0,
        cvNoiBo: (this.addDocForm.value.cvNoiBo != null)?1:0,
        iso: (this.addDocForm.value.iso != null)?1:0,
        utSearch: (this.addDocForm.value.utSearch != null)?1:0,
        center: parseInt(this.addDocForm.value.center)
      })

      const formData = new FormData();

      let documentOfficalDispatch = {
        'numDocEn':this.addDocForm.value.numDocEn,
        'titleEn': this.addDocForm.value.titleEn,
        'center': this.addDocForm.value.center,
        'iso': this.addDocForm.value.iso,
        'cvNoiBo': this.addDocForm.value.cvNoiBo,
        'cvCham': this.addDocForm.value.cvCham,
        'lyDoCham': this.addDocForm.value.lyDoCham,
        'contentEn': this.addDocForm.value.contentEn,
        'utSearch': this.addDocForm.value.utSearch,
        'createdTime': this.addDocForm.value.createdTime,
        'beginPublish': this.addDocForm.value.beginPublish,
        'cvSource': this.addDocForm.value.cvSource
      }
      formData.append('file',this.currentFile);
      formData.append('documentOfficalDispatch',
        new Blob([JSON.stringify(documentOfficalDispatch)],{
          type: 'application/json'
        }))
      console.log(formData.get('documentOfficalDispatch'))
      this.service.doCreateDocumentOfficalDispatch(formData,{method:'POST'}).then(data=>{
        if(data.body.code == 0){
          Swal.fire({
            title: 'Đã tạo công văn.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.disableModalAdd.emit(false);         
        }
        else{
          Swal.fire({
            title: 'Có lỗi xảy ra!',
            icon: 'error',
            confirmButtonText: 'OK'
          }) 
        }
      })
    }
  }

  validate(){
    let isValid=true;
    let isForcus = false;

    if(this.addDocForm.value.numDocEn == null || this.addDocForm.value.numDocEn == ''){
      isValid = false;
      this.addNumDocElement.nativeElement.focus();
      this.numDocMessage = "Số công văn không được để trống"
    }

    if(this.addDocForm.value.title == null || this.addDocForm.value.title == ''){
      isValid == false;
    }

    return isValid;
  }

  clearInfomationInput(){
    this.addDocForm.patchValue({
      numDocEn: "",
      titleEn: "",
      center: null,
      iso: null,
      cvNoiBo: null,
      cvCham: null,
      lyDoCham: "",
      contentEn: "",
      utSearch: null,
      createdTime: null,
      beginPublish: null,
      cvSource: null,
      file: null,
    })
  }
}
