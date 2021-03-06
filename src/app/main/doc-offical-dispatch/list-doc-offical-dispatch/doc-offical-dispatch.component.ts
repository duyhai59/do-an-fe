import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation,Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as snippet from "app/main/forms/form-layout/form-layout.snippetcode";
import { DocOfficalDispatchService } from '../doc-offical-dispatch.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { title } from 'process';
import { CenterService } from 'app/main/center/center.service';

@Component({
  selector: 'app-doc-offical-dispatch',
  templateUrl: './doc-offical-dispatch.component.html',
  styleUrls: ['./doc-offical-dispatch.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DocOfficalDispatchComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service:DocOfficalDispatchService,
            private ref:ChangeDetectorRef,private router:Router,private location: Location,
            private centerService:CenterService) { }

  docForm: FormGroup;
  public contentHeader: object;
  public _snippetCodeMultiple = snippet.snippetCodeMultiple;
  isHidden =true;
  isVisibleMiddle = false;
  isVisibleMiddleUpdate = false;
  isVisibleMiddleUpload = false;
  currentFile;
  isSpinning = false;
  isShowSearchArea = false;
  listCenter=[]

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ]

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  currentPage=1;
  perPage = 10;
  public maxPage = 1;
  public pageArr = [];
  public showPagination = false;
  public totalResult = 0;

  listOfCurrentPageData:any=[];
  ngOnInit(): void {
    this.initDocForm();
    this.getCenters();
    this.doSearch();
  }

  initDocForm(){
    this.docForm = this.formBuilder.group({
      numDocEn: [''],
      titleEn: [''],
      contentEn: [''],
      center: [undefined],
      utSearch: [undefined],
      cvCham: [undefined],
      cvNoiBo: [undefined],
      iso: [undefined],
      fromDate: [undefined],
      toDate: [undefined]
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

  doShow(event){
    this.currentPage = event;
    console.log("current page: "+this.currentPage)
    this.doSearch();
  }

  async doSearch(){
    let fromDateValue :any = '';
    let toDateValue :any = '';
    if(this.docForm.value.fromDate !=null){
      fromDateValue = new Date(this.docForm.value.fromDate);
    }
    if(this.docForm.value.toDate !=null){
      toDateValue = new Date(this.docForm.value.toDate);
    }

    let formatFromDate = this.service.formatDate(fromDateValue);
    let formatToDate = this.service.formatDate(toDateValue);

    let params = {method: 'GET',
                numDoc: (this.docForm.value.numDocEn != null && this.docForm.value.numDocEn !='')?(this.docForm.value.numDocEn.trim()):'',
                title: (this.docForm.value.titleEn != null && this.docForm.value.titleEn !='')?(this.docForm.value.titleEn.trim()):'',
                content: (this.docForm.value.contentEn != null && this.docForm.value.contentEn!='')?(this.docForm.value.contentEn.trim()):'',
                center: (this.docForm.value.center!= null)?((this.docForm.value.center==true)?1:0):'',
                utSearch: (this.docForm.value.utSearch != null)?((this.docForm.value.utSearch==true)?1:0):'',
                cvCham: (this.docForm.value.cvCham != null)?((this.docForm.value.cvCham==true)?1:0):'',
                cvNoiBo: (this.docForm.value.cvNoiBo !=null)?((this.docForm.value.cvNoiBo==true)?1:0):'',
                iso: (this.docForm.value.iso !=null)?((this.docForm.value.iso==true)?1:0):'',
                fromDate: formatFromDate,
                toDate: formatToDate,
                sort: true,
                currentPage: this.currentPage -1,
                perPage: 10};
    this.service.doSearchDocumentOfficalDispatch(params).then(data=>{
      if(data.code == 0){
        this.listOfCurrentPageData = JSON.parse(JSON.stringify(data.content))['items'];
        console.log(this.listOfCurrentPageData);
        this.totalResult = JSON.parse(JSON.stringify(data.content))['total'];
        console.log('total: '+this.totalResult)
      }else{
        Swal.fire({
          title:'Kh??ng t??m th???y c??ng v??n n??o',
          icon:'error',
          confirmButtonText: 'OK'
        })
      }
      this.ref.detectChanges();
    })
  }

  clearSearchInput(){
    this.docForm.patchValue({
      numDocEn: '',
      titleEn: '',
      contentEn: '',
      center: null,
      utSearch: false,
      cvCham: false,
      cvNoiBo: false,
      iso: false,
      fromDate: null,
      toDate: null
    })
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  onTableDataChange(event){
    this.currentPage = event;
    // this.doSearch();
    return this.currentPage;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  showModalMiddleUpdate(): void {
    this.isVisibleMiddleUpdate = true;
  }

  showModalMiddleUpload(): void {
    this.isVisibleMiddleUpload = true;
  }

  handleOkMiddle(): void {
    // this.isVisibleMiddle = false;
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisibleMiddle = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleOkMiddleUpdate(): void {
    this.isConfirmLoadingUpdate = true;
    setTimeout(() => {
      this.isVisibleMiddleUpdate = false;
      this.isConfirmLoadingUpdate = false;
    }, 1000);
  }

  handleOkMiddleUpload(): void {
    this.isConfirmLoadingUpload = true;
    setTimeout(() => {
      this.isVisibleMiddleUpload = false;
      this.isConfirmLoadingUpload = false;
      this.ref.detectChanges();
      this.doSearch();
    }, 1000);
  }

  handleCancelMiddle(event?): void {
    this.isVisibleMiddle = false;
  }

  handleCancelMiddleUpdate(event?): void {
    this.isVisibleMiddleUpdate = false;
  }

  handleCancelMiddleUpload(): void {
    this.isVisibleMiddleUpload = false;
    this.ref.detectChanges();
    this.doSearch();
  }

  isVisible = false;
  isConfirmLoading = false;

  isVisibleUpdate = false;
  isConfirmLoadingUpdate = false;
  isConfirmLoadingUpload = false;

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  clearMultipleRecord(){
    Swal.fire({ 
      title: "B???n c?? ch???c ch???n mu???n x??a "+this.setOfCheckedId.size+" c??ng v??n kh??ng?",
      icon: "question",
      confirmButtonText: "C??",
      showDenyButton: true,
      denyButtonText: 'Kh??ng'
    }).then(res=>{
      if(res.isConfirmed){
        if(this.setOfCheckedId.size > 0){
          this.setOfCheckedId.forEach(item=>{
            this.service.doDeleteDocumentOfficalDispatch({method:'DELETE'},item).then(data=>{
              if(data.code == 0){
                console.log('???? x??a c??ng v??n v???i id '+item);
              }else{
                console.log('Kh??ng th??? x??a c??ng v??n c?? id '+item);
              }
            })
          })
          Swal.fire({
            title: '???? x??a '+this.setOfCheckedId.size+" c??ng v??n.",
          }).then(res=>{
            this.ref.detectChanges();
            this.doSearch();
          }) 
        }
      }
    })
  }

  exportFile(){
    let params = {method: 'GET'};
    this.service.exportFileExcel(params).then((data:any)=>{
      var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ds_cong_van.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  editDocOfficalDispatch(id:any){
    localStorage.removeItem("docOfficalDispatchId");
    localStorage.setItem("docOfficalDispatchId",id);
  }

  back(){
    this.location.back();
  }

  async deleteDocOfficalDispatch(id:any){
    let params = {method: "DELETE"}
    Swal.fire({
      title: "B???n c?? ch???c ch???n mu???n x??a d??? li???u n??y kh??ng?",
      icon: "question",
      confirmButtonText: "C??",
      showDenyButton: true,
      denyButtonText: "Kh??ng"
    }).then(res=>{
      if(res.isConfirmed){
        this.service.doDeleteDocumentOfficalDispatch(params,id).then(data=>{
          if(data.code == 0){
            Swal.fire({
              title: "???? x??a d??? li???u.",
              icon:"success",
              confirmButtonText: "OK"
            })
            this.doSearch();
          }
        })
      }
    })
  }

  toggleSearchArea(){
    this.isShowSearchArea = !this.isShowSearchArea;
  }
}
