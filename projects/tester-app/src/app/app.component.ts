import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public handleClock(): void {
    console.log('Clock timeout!');
  }

  public handleWizard(e: FormData): void {
    console.log('Wizard Finished!', e);
  }

  public handleCalendar(e: Date): void {
    console.log('Date was selected!', e);
  }
}
