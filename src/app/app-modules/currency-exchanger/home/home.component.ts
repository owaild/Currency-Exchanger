import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyExchangerService } from 'src/app/@AppService/services/currencyExchanger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  rate: any = {};
  rates: any = [];
  rateKeys: any = [];
  symbol: any = {};
  symbols: any = [];
  symbolKeys: any = [];
  newForm!: FormGroup;
  message: any = '';
  constructor(public CurrencyExchanger: CurrencyExchangerService) {

  }

  ngOnInit() {
    this.newForm = new FormGroup({
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required)
    });
    this.init();
  }

  init() {
    this.CurrencyExchanger.currencyRate().subscribe(
      (data: any) => {
        this.rate = data["rates"];
        this.rateKeys = Object.keys(this.rate);
        for (var i = 0; i < this.rateKeys.length; i++) {
          this.rates.push({
            code: this.rateKeys[i],
            text: this.rate[this.rateKeys[i]]
          });
        }
      },
      err => { }
    );

    this.CurrencyExchanger.currencySymbols().subscribe(
      (data: any) => {
        this.symbol = data["symbols"];
        this.symbolKeys = Object.keys(this.symbol);
        for (var i = 0; i < this.symbolKeys.length; i++) {
          this.symbols.push({
            code: this.symbolKeys[i],
            text: this.symbol[this.symbolKeys[i]]
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
    let toIndex = this.rates.findIndex((rate: any) => {
      return rate.code == to;
    });
    let fromIndex = this.rates.findIndex((rate: any) => {
      return rate.code == from;
    });
    let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    let cal = ratio * amount;
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
