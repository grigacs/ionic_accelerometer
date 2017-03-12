import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as io from "socket.io-client";



@Component({
  selector: 'page-accel',
  templateUrl: 'accel.html'
})
export class AccelPage {
  socket: any;
  frequency: number;
  seconds: number;
  options: any;
  op: any;
  sec: number= 0;
  length: number=0;
  timeInterval: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = io.connect('http://192.168.1.6:8100');
    this.frequency = 2000;
  }

  freq() {
    this.options = {frequency: this.frequency};
    return this.options;
  }

  ionViewDidLoad() {
    this.showSeconds();
    (<any>window).accplugin.watchAcceleration((acc) => {
        this.length += acc.dataX.length;

        this.socket.emit("accMeterParams",{
          dataX: acc.dataX,
          dataY: acc.dataY,
          dataZ: acc.dataZ
        });

    }, (error) => {
        alert(error);
      },
      this.op = this.freq());
  }


  showSeconds(){
      this.timeInterval = setInterval(()=>{
          this.sec += 1;
      },1000)
  }
}
