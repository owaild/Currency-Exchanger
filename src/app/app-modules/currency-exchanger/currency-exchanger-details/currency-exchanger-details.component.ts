import { Component } from '@angular/core';
import { StorageService } from 'src/app/@AppService/services/storage.service';

@Component({
  selector: 'app-currency-exchanger-details',
  templateUrl: './currency-exchanger-details.component.html',
  styleUrls: ['./currency-exchanger-details.component.scss']
})
export class CurrencyExchangerDetailsComponent {
  historyExchangeRates: any[] = []

  constructor(
    public Storage: StorageService) {
    this.historyExchangeRates = Storage.getObject("exchangeRates")
  }

}
