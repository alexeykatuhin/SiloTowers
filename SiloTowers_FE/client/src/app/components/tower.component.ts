import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Indicator } from '../models/Indicator';
import { Tower } from '../models/Tower';
import { TowerService } from '../services/tower.service';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss']
})
export class TowerComponent implements OnInit {
  @Input()
  tower!: Tower;
  emptyPercent!: string;
  fullPercent!: string;
  massColor!: string;
  levelColor!: string;
  isShowModal = false;
  isConfirmLoading = false;
  editIndicator!: Indicator;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private towerService: TowerService) {
  }
  ngOnInit(): void {

    this.calcPercentage()

    this.calcIndicatorColor()

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      value: [null, [Validators.required, this.validatorsService.isInteger]],
      minValue: [null, [Validators.required, this.validatorsService.isInteger, this.minValidator]],
      maxValue: [null, [Validators.required, this.validatorsService.isInteger, this.maxValidator]],
    });
  }


  private calcPercentage() {
    let fullPercentage = this.tower.indicatorLevel.maxValue - this.tower.indicatorLevel.minValue
    let curPercent = Math.round(this.tower.indicatorLevel.value * 100 / fullPercentage)
    let empty
    if (curPercent < 0)
      empty = 100;
    else if (curPercent > 100)
      empty = 0;
    else
      empty = curPercent;

    this.emptyPercent = `${100 - empty}%`
    this.fullPercent = `${empty}%`
  }
  private calcIndicatorColor() {
    this.massColor = this.getIndicatorColor(this.tower.indicatorMass)
    this.levelColor = this.getIndicatorColor(this.tower.indicatorLevel)
  }
  private getIndicatorColor(indicator: Indicator): string {
    if (indicator.value >= indicator.minValue && indicator.value <= indicator.maxValue)
      return 'green'
    return 'red'
  }

  public showModal(indicator: Indicator) {
    this.validateForm.reset({
      title: indicator.title,
      value: indicator.value, minValue: indicator.minValue, maxValue: indicator.maxValue
    })

    this.editIndicator = indicator;
    this.isShowModal = true;

  }
  submitForm() {
    let f = this.validateForm.controls;
    for (const i in f) {
      f[i].markAsDirty();
      f[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    }

    this.isConfirmLoading = true

    this.editIndicator.maxValue = parseInt(f.maxValue.value);
    this.editIndicator.minValue = parseInt(f.minValue.value);
    this.editIndicator.value = parseInt(f.value.value);
    this.editIndicator.title = f.title.value;


    this.towerService.editIndicator(this.editIndicator).subscribe(x => {
      this.tower = this.tower

      this.calcIndicatorColor()
      this.calcPercentage()
      this.isConfirmLoading = false
      this.isShowModal = false;
    })

  }

  cancel() {
    this.isShowModal = false;
  }
  faCog = faCog;

  minValidator = (control: FormControl): { [s: string]: boolean } => {

    if (!control.value && control.value != 0) {
      return { required: true };
    } else if (control.value > this.validateForm.controls.maxValue.value) {
      return { error: true };
    }

    return {};
  };

  maxValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value && control.value != 0) {
      return { required: true };
    } else if (control.value < this.validateForm.controls.minValue.value) {
      return { error: true };
    }

    return {};
  };
}
