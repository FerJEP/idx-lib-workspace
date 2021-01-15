import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClockModule, WizardModule, CalendarModule } from 'idx-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClockModule, WizardModule, CalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
