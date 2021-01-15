import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClockMode } from './clock';

@Component({
  selector: 'idx-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['../reset.css', './clock.component.css'],
})
export class ClockComponent implements OnInit {
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  public backup = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  public interval: NodeJS.Timeout;

  @Input() public mode: ClockMode = 'clock';
  @Output() public evTimeout = new EventEmitter<null>();

  // Timer or stopwatch mode
  public isRunning = false;
  public isPaused = false;

  constructor() {}

  public ngOnInit(): void {
    if (this.mode === 'clock') {
      const updateCurrentTime = () => {
        const date = new Date();
        this.setCurrentTime(
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        );
      };

      updateCurrentTime();
      this.interval = setInterval(() => updateCurrentTime(), 1000);
    }
  }

  public padString(value: string | number): string {
    return String(value).padStart(2, '0');
  }

  public setCurrentTime(h: number, m: number, s: number): void {
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }

  public startTimer(): void {
    if (
      // If it is a valid mode
      (this.mode === 'timer' || this.mode === 'stopwatch') &&
      // If it is a valid state
      (!this.isRunning || this.isPaused)
    ) {
      clearInterval(this.interval);

      let h = this.hours;
      let m = this.minutes;
      let s = this.seconds;

      if (this.mode === 'timer') {
        this.backup.hours = h;
        this.backup.minutes = m;
        this.backup.seconds = s;

        this.interval = setInterval(() => {
          s--;

          if (s < 0) {
            m--;
            if (m < 0) {
              h--;
              if (h < 0) {
                return this.timeout();
              } else {
                m = 59;
              }
            } else {
              s = 59;
            }
          }

          this.setCurrentTime(h, m, s);
        }, 1000);
      } else if (this.mode === 'stopwatch') {
        this.interval = setInterval(() => {
          s++;

          if (s > 59) {
            m++;
            if (m > 59) {
              h++;
              if (h > 23) {
                return this.timeout();
              } else {
                m = 0;
              }
            } else {
              s = 0;
            }
          }

          this.setCurrentTime(h, m, s);
        }, 1000);
      }
      this.isRunning = true;
      this.isPaused = false;
    }
  }

  public timeout(): void {
    if (this.isRunning) {
      this.stopTimer();
      this.evTimeout.emit();
    }
  }

  public stopTimer(): void {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isPaused = false;

    this.hours = this.backup.hours;
    this.minutes = this.backup.minutes;
    this.seconds = this.backup.seconds;
  }

  public pauseTimer(): void {
    if (!this.isPaused && this.isRunning) {
      clearInterval(this.interval);
      this.isPaused = true;
    }
  }

  public handleInput(input: HTMLInputElement, which: string): void {
    let valueString = input.value;

    if (valueString.length > 2) {
      valueString = valueString.slice(-2);
    }

    let value = Number(valueString);

    if (which === 'h') {
      if (value > 24 || value < 0) {
        value = 0;
      }
      this.hours = value;
    } else {
      if (value > 59 || value < 0) {
        value = 0;
      }
      if (which === 'm') {
        this.minutes = value;
      } else {
        this.seconds = value;
      }
    }
    input.value = this.padString(value);
  }
}
