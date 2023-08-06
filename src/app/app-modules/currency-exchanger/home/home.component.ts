import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currencySymbol, rate } from 'src/app/@AppService/models/common.model';
import { CurrencyExchangerService } from 'src/app/@AppService/services/currencyExchanger.service';
import { StorageService } from 'src/app/@AppService/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  rates: rate[] = [{ code: '', exchanger: 0 }];
  rateKeys: any = [];
  symbol: currencySymbol = { code: '', text: "" };
  symbols: currencySymbol[] = [];
  symbolKeys: any = [];
  newForm!: FormGroup;
  message: any = '';
  historyExchangeRates: any
  constructor(public CurrencyExchanger: CurrencyExchangerService,
    public Storage: StorageService) {

  }

  swap() {
    let from = this.newForm.controls["from"].value;
    let to = this.newForm.controls["to"].value;
    this.newForm.controls["from"].setValue(to)
    this.newForm.controls["to"].setValue(from)
  }

  ngOnInit() {
    this.newForm = new FormGroup({
      from: new FormControl("EUR", Validators.required),
      to: new FormControl("USD", Validators.required),
      amount: new FormControl("", Validators.required)
    });
    this.init();
  }

  init() {
    this.CurrencyExchanger.currencyRate({}).subscribe(
      (data: any) => {
        debugger
        let RateData = data["rates"];
        // this.rates = data["rates"];
        this.rateKeys = Object.keys(RateData);
        for (var i = 0; i < this.rateKeys.length; i++) {
          this.rates.push({
            code: this.rateKeys[i],
            exchanger: RateData[this.rateKeys[i]]
          });
        }
      },
      err => { }
    );

    this.CurrencyExchanger.currencySymbols({ base: "GBP" }).subscribe(
      (data: any) => {

        let symbolData = data["symbols"];
        this.symbolKeys = Object.keys(symbolData);
        for (var i = 0; i < this.symbolKeys.length; i++) {
          this.symbols.push({
            code: this.symbolKeys[i],
            text: symbolData[this.symbolKeys[i]]
          });
        }
      },
      err => { }
    );
  }
  convert() {
    let from = this.newForm.controls["from"].value;
    let to = this.newForm.controls["to"].value;
    let amount = this.newForm.controls["amount"].value;
    let toIndex: number = this.rates.findIndex((rate: rate) => rate.code == to);
    let fromIndex: number = this.rates.findIndex((rate: rate) => rate.code == from);
    let ratio = Number(this.rates[toIndex].exchanger) / Number(this.rates[fromIndex].exchanger)
    let cal = ratio * amount;
    let exchangeRatesList: any[] = []
    if (this.Storage.getObject("exchangeRates")) {
      exchangeRatesList = [...this.Storage.getObject("exchangeRates"), {
        from: from,
        formName: this.symbols.filter(res => res.code == from)[0].text,
        to: to,
        amount: amount,
        ToName: this.symbols.filter(res => res.code == to)[0].text,
        cal: cal,
        date: new Date()
      }]
    } else {
      exchangeRatesList = [{
        from: from,
        formName: this.symbols.filter(res => res.code == from)[0].text,
        amount: amount,

        to: to,
        ToName: this.symbols.filter(res => res.code == to)[0].text,
        cal: cal,
        date: new Date()
      }]
    }
    this.Storage.setObject('exchangeRates', [...exchangeRatesList])




    this.message =
      amount +
      " " +
      this.rates[fromIndex].code +
      " is equal to " +
      cal +
      " " +
      this.rates[toIndex].code;
  }
}
