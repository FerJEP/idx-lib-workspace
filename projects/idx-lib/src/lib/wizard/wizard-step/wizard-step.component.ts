import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'idx-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['../../reset.css', './wizard-step.component.css'],
})
export class WizardStepComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  @Input() public title: string;
  @HostBinding('class.hidden') public hidden = true;
  @ViewChild('form', { static: true })
  private formRef: ElementRef<HTMLFormElement>;
  public index: number;
  public onChange: Observable<Event>;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterContentInit(): void {}

  public ngAfterViewInit(): void {
    this.onChange = fromEvent(this.formRef.nativeElement, 'change');
  }

  public valid(): boolean {
    return this.formRef.nativeElement.checkValidity();
  }

  public getObject(): {} {
    const formData = new FormData(this.formRef.nativeElement);

    const obj: { [k: string]: any } = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }
}
