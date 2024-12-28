import {ChangeDetectionStrategy, Component, inject, NgZone, OnInit, Signal, signal} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit{
  private zone = inject(NgZone)

  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit() {
    setTimeout(() => {this.count.set(0)},4000)
    //il codice in zone runna oustide a zone.js quindi il change detection di angular non lo detecta
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {this.count.set(0)},4000)
    })
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
