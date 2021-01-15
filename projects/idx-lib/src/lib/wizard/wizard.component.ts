import {
  Component,
  OnInit,
  Input,
  Output,
  AfterContentInit,
  ContentChildren,
  QueryList,
  EventEmitter,
} from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@Component({
  selector: 'idx-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['../reset.css', './wizard.component.css'],
})
export class WizardComponent implements OnInit, AfterContentInit {
  @Input()
  public title: string;

  @Output() public evFinish = new EventEmitter<FormData>();

  @ContentChildren(WizardStepComponent)
  public forms: QueryList<WizardStepComponent>;
  public currentForm: WizardStepComponent;

  constructor() {}

  public ngAfterContentInit(): void {
    this.forms.forEach((wizardStep, index) => {
      wizardStep.index = index;
      return wizardStep;
    });

    this.currentForm = this.forms.first;
    this.currentForm.hidden = false;
  }

  public ngOnInit(): void {}

  public checkWizardValidity(): boolean {
    return !this.forms.some((form) => !form.valid());
  }

  public setCurrentForm(form: WizardStepComponent): void {
    this.currentForm.hidden = true;
    this.currentForm = form;
    this.currentForm.hidden = false;
  }

  public nextForm(): void {
    if (this.currentForm.valid()) {
      const nextForm = this.forms.toArray()[this.currentForm.index + 1];
      if (nextForm) {
        this.setCurrentForm(nextForm);
      }
    }
  }

  public previousForm(): void {
    const previousForm = this.forms.toArray()[this.currentForm.index - 1];

    if (previousForm) {
      this.setCurrentForm(previousForm);
    }
  }
  public goFirstForm(): void {
    const firstForm = this.forms.toArray()[0];
    this.setCurrentForm(firstForm);
  }

  public finishWizard(): void {
    const obj = this.forms.reduce((prevObj, form) => {
      return {
        ...prevObj,
        ...form.getObject(),
      };
    }, {});

    const formData = new FormData();

    for (const key of Object.keys(obj)) {
      formData.append(key, obj[key]);
    }

    this.evFinish.emit(formData);
  }
}
