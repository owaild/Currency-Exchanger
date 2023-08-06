import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyExchangerComponent } from './currency-exchanger.component';
import { HomeComponent } from './home/home.component';
import { CurrencyExchangerDetailsComponent } from './currency-exchanger-details/currency-exchanger-details.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyExchangerComponent,
    children: [
      {
        path: 'Home',
        component: HomeComponent,
      },
      {
        path: 'exchanger-details',
        component: CurrencyExchangerDetailsComponent,
      },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyExchangerRoutingModule { }
