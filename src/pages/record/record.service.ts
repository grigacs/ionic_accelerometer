/**
 * Created by griga on 2017-03-25.
 */


export class RecordService {

  dataX: Array<any> = Array(197);
  dataY: Array<any> = Array(197);
  dataZ: Array<any> = Array(197);
  frequency: number = 2000;
  seconds: number;
  options: any;
  id: any;
  minX: number = 0;
  minY: number = 0;
  minZ: number = 0;
  maxX: number = 0;
  maxY: number = 0;
  maxZ: number = 0;

  constructor() {
  }

  start(){
   this.id = (<any>window).accplugin.watchAcceleration((acc) => {
        this.dataX = acc.dataX;
        this.dataY = acc.dataY;
        this.dataZ = acc.dataZ;
      }, (error) => {
        alert(error);
      },
      this.freq());
  }

  freq() {
    this.options = {frequency: this.frequency};
    return this.options;
  }

  stop() {
    (<any>window).accplugin.clearWatch(this.id);
  }

  sendData(){
    for(let i = 0; i < this.dataX.length; i++){
      if(this.dataX.length > 0) {
        this.dataX[i] = parseFloat(this.dataX[i]);
        if (this.dataX[i] < this.minX) {
          this.minX = this.dataX[i];
        }
        if (this.dataX[i] > this.maxX) {
          this.maxX = this.dataX[i];
        }
      }
      if(this.dataY.length > 0) {
        this.dataY[i] = parseFloat(this.dataY[i]);
        if (this.dataY[i] < this.minY) {
          this.minY = this.dataY[i];
        }
        if (this.dataY[i] > this.maxY) {
          this.maxY = this.dataY[i];
        }
      }
      if(this.dataZ.length > 0) {
        this.dataZ[i] = parseFloat(this.dataZ[i]);
        if (this.dataZ[i] < this.minZ) {
          this.minZ = this.dataZ[i];
        }
        if (this.dataZ[i] > this.maxZ) {
          this.maxZ = this.dataZ[i];
        }
      }
    }
    return [this.dataX, this.dataY, this.dataZ];
  }

  minValues(): Array<number>{
    return [this.minX, this.minY, this.minZ];
  }
  maxValues(): Array<number>{
    return [this.maxX, this.maxY, this.maxZ];
  }


}
