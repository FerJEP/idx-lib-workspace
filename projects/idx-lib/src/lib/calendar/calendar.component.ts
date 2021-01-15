import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { weekdays, months } from './labels';

@Component({
  selector: 'idx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['../reset.css', './calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  public year: number;
  public month: number;
  public date: Date;

  // Month info
  public placeholders: Array<number | null>;

  public minYear = 1900;
  public maxYear = 2050;

  public weekdayslabel = weekdays;
  public monthLabel = months;

  @Output() public evSelect = new EventEmitter<Date>();

  constructor() {}

  public ngOnInit(): void {
    this.date = new Date();

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();

    this.updatePlaceholders();
  }

  public updatePlaceholders(): void {
    const start = new Date(this.year, this.month, 1).getDay();
    const length = start + 32 - new Date(this.year, this.month, 32).getDate();

    const array = [];

    // 42 placeholders
    for (let i = 0; i <= 41; i++) {
      if (i >= start && i <= length - 1) {
        array.push(i - start + 1);
      } else {
        array.push(null);
      }
    }

    this.placeholders = array;
  }

  public selectDate(target: HTMLElement): void {
    const day = parseInt(target.getAttribute('data-index'), 10);

    if (day && !this.isCurrentDate(this.year, this.month, day)) {
      this.date = new Date(this.year, this.month, day);
      this.evSelect.emit(this.date);
    }
  }

  public isCurrentDate(year: number, month: number, day: number): boolean {
    return (
      this.date.getFullYear() === year &&
      this.date.getMonth() === month &&
      this.date.getDate() === day
    );
  }

  public setMonth(value: number | string, byCurrent = false): void {
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }

    if (byCurrent) {
      value = this.month + value;
    }
    this.month = Math.min(Math.max(value, 0), 11);
    this.updatePlaceholders();
  }

  public setYear(value: number | string, byCurrent = false): void {
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }

    if (byCurrent) {
      value = this.year + value;
    }

    this.year = Math.min(
      Math.max(value, this.minYear),
      // tslint:disable-next-line:trailing-comma
      this.maxYear
    );
    this.updatePlaceholders();
  }
}
