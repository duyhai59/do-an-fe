import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-hotnews-config',
  templateUrl: './hotnews-config.component.html',
  styleUrls: ['./hotnews-config.component.scss'],
})
export class HotnewsConfigComponent implements OnInit {
  date = null;
  configForm: FormGroup;
  
  

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit( ): void {
    this.configForm = this.formBuilder.group({
        title: [{value: '', disabled: true}],
        newsType: [{value: '1', disabled: true}],
        isHotNews: "",
        isShowOnHomePage: true,
        // date0: ""
        dates: this.formBuilder.array([this.formBuilder.group({
          date: ''
       })])
    })
  }

  visible = false;

  showMoreConfiguredDate(){
    this.dates.push(this.formBuilder.group({
      date: ''
   }));
    console.log(this.configForm.value.dates)
  }

  get dates() {
    return this.configForm.controls["dates"] as FormArray;
  }

  hideMoreConfiguredDate(dateIndex){
    this.dates.removeAt(dateIndex);
    console.log(this.configForm)
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  changeType1(){
    if(this.configForm.value.isHotNews){
      this.configForm.patchValue({
        isShowOnHomePage: false
      })
    }else {
      this.configForm.patchValue({
        isShowOnHomePage: true
      })
    };
  }

  changeType2(){
    if(this.configForm.value.isShowOnHomePage){
      this.configForm.patchValue({
        isHotNews: false
      })
    }else {
      this.configForm.patchValue({
        isHotNews: true
      })
    };
  }

}
