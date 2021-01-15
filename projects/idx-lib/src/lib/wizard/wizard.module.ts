import { NgModule } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { CommonModule } from '@angular/common';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@NgModule({
  declarations: [WizardComponent, WizardStepComponent],
  imports: [CommonModule],
  exports: [WizardComponent, WizardStepComponent],
})
export class WizardModule {}
