import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CurrencyExchangerDetailsComponent } from './currency-exchanger-details/currency-exchanger-details.component';
import { CurrencyExchangerComponent } from './currency-exchanger.component';
import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CurrencyExchangerComponent,
    HomeComponent,
    CurrencyExchangerDetailsComponent,



  ],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyExchangerRoutingModule,

  ]
})
export class CurrencyExchangerModule { }
