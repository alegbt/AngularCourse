import {Component, computed, inject, input, Input} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-investment-results',
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  private investmentService = inject(InvestmentService);

  results = computed(() => this.investmentService.resultData());

  //non si usa questo perche computed presenta resultData come di sola scrittura e non puoi modificare accidental;mente resultData
  // get results(){
  //   return this.investmentService.resultData;
  // }

}
