import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseChartDirective } from 'ng2-charts';
import {RecordService} from "./record.service";
/*
  Generated class for the Record page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
  providers: [RecordService]
})
export class RecordPage {
  length: number = 197;
  datasets: Array<any>;
  getDatasetsInterval;
  refreshChartInterval;
  getFirstime: boolean = true;
  dataX: Array<any>;
  dataY: Array<any>;
  dataZ: Array<any>;
  datasRefreshed: boolean = false;
  tempDataX: Array<any>;
  tempDataY: Array<any>;
  tempDataZ: Array<any>;
  dataXYZ:Array<any>;
  tempDataXYZ:Array<any>;
  xyz:Array<any>;
  min:Array<any>;
  max:Array<any>;
  loading:boolean = true;

  public lineChartData:Array<any> = [
    {data: Array(this.length), label: 'X'},
    {data: Array(this.length), label: 'Y'},
    {data: Array(this.length), label: 'Z'}
  ];

  public lineChartLabels:Array<any> = Array(this.length);

  public lineChartOptions:any = {
    responsive: true,
    animationSteps: 10,
    scaleShowVerticalLines: false,
    scales:{
      xAxes: [{
        gridLines:{
          display:false,
        }
      }]
    },
    strokeWidth: 0.1,
    datasetStrokeWidth: 0.1,
  };

  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(255, 33, 25, 0.7)',
      pointBorderColor: 'rgba(148,159,177,0)',
    },
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(29, 251, 107, 0.7)',
      pointBorderColor: 'rgba(148,159,177,0)',
    },
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(29, 112, 255, 0.7)',
      pointBorderColor: 'rgba(148,159,177,0)',
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  constructor(public navCtrl: NavController, public navParams: NavParams, private recordeService: RecordService) {

  }

  ionViewWillEnter() {
    const DATAXPOSITION = 0;
    const DATAYPOSITION = 1;
    const DATAZPOSITION = 2;
    this.recordeService.start();
    console.log('start');
    this.getDatasetsInterval = setInterval(()=>{
      this.datasets = this.recordeService.sendData();

      this.dataX = this.datasets[DATAXPOSITION];
      this.dataY = this.datasets[DATAYPOSITION];
      this.dataZ = this.datasets[DATAZPOSITION];
      this.dataXYZ = [this.dataX, this.dataY, this.dataZ];
      this.min = this.recordeService.minValues();
      this.max = this.recordeService.maxValues();
      if(this.datasets[DATAXPOSITION][0] >=0 || this.datasets[DATAXPOSITION][0] < 0) {
        if (this.datasRefreshed === true) {
          this.getFirstime = false;
        }
        this.datasRefreshed = true;
      }
    },2000);

    this.refreshChartInterval = setInterval(()=>{
        if(this.datasRefreshed && this.getFirstime === true){

          this.tempDataX = this.dataX;
          this.tempDataY = this.dataY;
          this.tempDataZ = this.dataZ;
          let _lineChartData = new Array(this.datasets.length);
          for(let i=0; i<_lineChartData.length;i++) {
            _lineChartData[i] = {
              data: this.dataXYZ[i],
              label: this.lineChartData[i].label
            };
          }
           this.lineChartData = _lineChartData;

        }else if(this.datasRefreshed && this.getFirstime === false){
          this.loading = false;
          let x:Array<number>;
          let y:Array<number>;
          let z:Array<number>;
          x = this.tempDataX.splice(0,6);
          y = this.tempDataY.splice(0,6);
          z = this.tempDataZ.splice(0,6);

          this.tempDataX =this.tempDataX.concat(this.dataX.splice(0,6));
          this.tempDataY =this.tempDataY.concat(this.dataY.splice(0,6));
          this.tempDataZ =this.tempDataZ.concat(this.dataZ.splice(0,6));

          this.tempDataXYZ = [x.concat(this.tempDataX), y.concat(this.tempDataY), z.concat(this.tempDataZ)];

          let _lineChartData = new Array(this.datasets.length);
          for(let i=0; i<_lineChartData.length;i++) {
            _lineChartData[i] = {
              data: this.tempDataXYZ[i],
              label: this.lineChartData[i].label
            };
          }
          this.lineChartData = _lineChartData;
        }
    },10);
  }


  ionViewWillLeave() {
    for(let i = 0;i<this.min.length;i++){
      this.min[i] = 0;
      this.max[i] = 0;
    }
    console.log('stop');
    this.loading = true;
    this.getFirstime = true;
    this.datasRefreshed = false;
    this.datasets = [];
    this.dataX = [];
    this.dataY = [];
    this.dataZ = [];
    this.dataXYZ = [];
    clearInterval(this.getDatasetsInterval);
    clearInterval(this.refreshChartInterval);
    this.recordeService.stop();
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
