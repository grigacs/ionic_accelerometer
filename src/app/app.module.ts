import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccelPage } from '../pages/accel/accel';
import {TabsPage} from "../pages/tabs/tabs";
import {RecordPage} from "../pages/record/record";
import {ListPage} from "../pages/list/list";
import {ChartComponent} from "../pages/record/chart.component";
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {ChartsModule} from "ng2-charts";
import {RecordService} from "../pages/record/record.service";


@NgModule({
  declarations: [
    MyApp,
    AccelPage,
    TabsPage,
    RecordPage,
    ListPage
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccelPage,
    TabsPage,
    RecordPage,
    ListPage
  ],
  providers: [
    RecordService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
