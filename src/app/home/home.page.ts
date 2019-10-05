import { Component, ViewChild, ElementRef } from '@angular/core';
import fetch from 'node-fetch';
import { Chart } from 'chart.js';
import { AlertController } from '@ionic/angular';

// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
// import { Router } from '@angular/router';
// import { LiveVideoPage } from '../pages/live-video/live-video.page';
const optionsStandard = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  cutoutPercentage: 70,
  rotation: 2.65 * Math.PI,
  circumference: 1.7 * Math.PI,
  // responsive: true,
  maintainAspectRatio: true,
};
const colorsStandard = [
  '#01ACEC',
  '#FFFFFF',
];
const dataInterval = 2500;

import config from './config.json';
const root = config.root;
const key = config.key;

const headers = {
  'X-AIO-Key': key,
  'Content-Type': 'application/json',
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('doughnutCanvas2') doughnutCanvas2: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  // private weightData: Array<number> = [];
  // private weightChart: Chart;
  private temperatureChart: Chart;
  private humidityChart: Chart;

  public temperature = 50;
  public humidity: number;
  // public weight: number;

  public wirelessPowerStatus: string;
  public relayStatus: string;
  public ledStatus: string;
  public videoNumber: string;
  public audioNumber: string;

  public ledON: boolean;
  public relayON: boolean;
  public wirelessPowerON: boolean;

  public videoOption: string;
  public audioOption: string;

  private temperatureInterval: any;
  private humidityInterval: any;
  // private weightInterval: any;

  private relayInterval: any;
  private ledInterval: any;
  private wirelessPowerInterval: any;
  private videoInterval: any;
  private audioInterval: any;

  // private ipAddress: string;
  // private videoURI: string;

  constructor(
    public alertController: AlertController,
    // public modalController: ModalController,
    // private streamingMedia: StreamingMedia,
    // private router: Router,
  ) { }

  ionViewDidEnter() {
    // this.weightChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: 'line',
    //   data: {
    //     datasets: [
    //       {
    //         data: [50, 50, 50],
    //         borderColor: '#3e95cd',
    //       }
    //     ]
    //   },
    //   options: optionsStandard,
    // });

    this.temperatureChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: colorsStandard,
            borderColor: colorsStandard,
            borderWidth: 1
          }
        ]
      },
      options: optionsStandard,
    });

    this.humidityChart = new Chart(this.doughnutCanvas2.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: colorsStandard,
            borderColor: colorsStandard,
            borderWidth: 1
          }
        ]
      },
      options: optionsStandard,
    });

    this.getFeedData('temperature');
    this.getFeedData('humidity');
    // this.getFeedData('weight');

    this.getFeedDataRaw('led');
    this.getFeedDataRaw('relay');
    this.getFeedDataRaw('wireless-power');
    this.getFeedDataRaw('video');
    this.getFeedDataRaw('audio');

    this.temperatureInterval = setInterval(() => {
      this.getFeedData('temperature');
    }, dataInterval);
    this.humidityInterval = setInterval(() => {
      this.getFeedData('humidity');
    }, dataInterval);
    // this.weightInterval = setInterval(() => {
    //   this.getFeedData('weight');
    // }, 1000);

    // this.ledInterval = setInterval(() => {
    //   this.getFeedDataRaw('led');
    // }, 1000);
    // this.relayInterval = setInterval(() => {
    //   this.getFeedDataRaw('relay');
    // }, 1000);
    // this.videoInterval = setInterval(() => {
    //   this.getFeedDataRaw('video');
    // }, 1000);
    // this.audioInterval = setInterval(() => {
    //   this.getFeedDataRaw('audio');
    // }, 1000);
  }

  ionViewDidLeave() {
    if (this.temperatureInterval) {
      clearInterval(this.temperatureInterval);
    }
    if (this.humidityInterval) {
      clearInterval(this.humidityInterval);
    }
    // if (this.weightInterval) {
    //   clearInterval(this.weightInterval);
    // }

    if (this.relayInterval) {
      clearInterval(this.relayInterval);
    }
    if (this.ledInterval) {
      clearInterval(this.ledInterval);
    }
    if (this.wirelessPowerInterval) {
      clearInterval(this.wirelessPowerInterval);
    }
    if (this.videoInterval) {
      clearInterval(this.videoInterval);
    }
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
    }
  }

  private async getFeedData(feedName) {
    try {
      const response = await fetch(`${root}/${feedName}`, {
        headers,
      });
      if (!response) {
        return;
      }
      const data = await response.json();
      const lastValue = Math.round(parseFloat(data.last_value) * 100) / 100;
      switch (feedName) {
        case 'temperature':
          this.temperature = lastValue;
          this.temperatureChart.data.datasets.forEach((dataset) => {
            dataset.data = [lastValue, 100 - lastValue];
          });
          this.temperatureChart.update();
          break;
        case 'humidity':
          this.humidity = lastValue;
          this.humidityChart.data.datasets.forEach((dataset) => {
            dataset.data = [lastValue, 100 - lastValue];
          });
          this.humidityChart.update();
          break;
        default:
          console.log(`Unknown data feed: ${feedName}`);
        // case 'weight':
        // this.weight = lastValue;
        // this.weightData.push(lastValue);
        // if (this.weightData.length > 20) {
        //   this.weightData = this.weightData.slice(1, this.weightData.length);
        // }
        // this.weightChart.data.datasets.forEach((dataset) => {
        //   dataset.data = this.weightData;
        // });
        // this.weightChart.update();
        // break;
      }
    } catch (e) {
      console.log('getFeedData:', e);
    }
  }

  private async getFeedDataRaw(feedName) {
    try {
      const response = await fetch(`${root}/${feedName}`, {
        headers,
      });
      if (!response) {
        return;
      }
      const data = await response.json();

      // sometimes, the adafruit api returns no data
      if (!data.last_value) {
        return;
      }

      const value = data.last_value.toLowerCase();
      switch (feedName) {
        case 'led':
          this.ledStatus = value;
          this.ledON = value === 'on';
          break;
        case 'relay':
          this.relayStatus = value;
          this.relayON = value === 'on';
          break;
        case 'wireless-power':
          this.wirelessPowerStatus = value;
          this.wirelessPowerON = value === 'on';
          break;
        case 'video':
          this.videoNumber = value;
          this.videoOption = value;
          break;
        case 'audio':
          this.audioNumber = value;
          this.audioOption = value;
          break;
      }
    } catch (e) {
      console.log('getFeedDataRaw:', e);
    }
  }

  private async addData(feedName: string, value: string) {
    try {
      const response = await fetch(`${root}/${feedName}/data`, {
        method: 'POST',
        body: JSON.stringify({
          value: value.toUpperCase(),
        }),
        headers,
      });
      if (!response) {
        switch (feedName) {
          case 'led':
            this.ledON = !value;
            break;
          case 'relay':
            this.relayON = !value;
            break;
          case 'wireless-power':
            this.wirelessPowerON = !value;
            break;
          default:
            console.log(`Unknown feed name: ${feedName}`);
        }
        const alert = await this.alertController.create({
          header: 'Adafruit Error',
          subHeader: 'Request to server failed.',
          message: 'Please try again in a few seconds.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      const data = await response.json();
      if (data.created_at) {
        switch (feedName) {
          case 'led':
            this.ledStatus = value;
            this.ledON = value === 'on';
            break;
          case 'relay':
            this.relayStatus = value;
            this.relayON = value === 'on';
            break;
          case 'wireless-power':
            this.wirelessPowerStatus = value;
            this.wirelessPowerON = value === 'on';
            break;
          case 'video':
            this.videoNumber = value;
            this.videoOption = value;
            break;
          case 'audio':
            this.audioNumber = value;
            this.audioOption = value;
            break;
        }
      }
    } catch (e) {
      console.log('addData:', e);
      const alert = await this.alertController.create({
        header: 'Adafruit Error',
        subHeader: 'Request to server failed.',
        message: e.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  public updateLED(ledState: boolean) {
    this.addData('led', ledState ? 'on' : 'off');
  }

  public updateRelay(relayState: boolean) {
    this.addData('relay', relayState ? 'on' : 'off');
  }

  public updateWirelessPower(wirelessPowerState: boolean) {
    this.addData('wireless-power', wirelessPowerState ? 'on' : 'off');
  }

  public updateVideo(val: string) {
    this.addData('video', val);
  }
  public updateAudio(val: string) {
    this.addData('audio', val);
  }

  // public async goToLiveVideo() {
  //   const alert = await this.alertController.create({
  //     header: 'Enter Stream Address',
  //     inputs: [
  //       {
  //         name: 'IPAddress',
  //         type: 'text',
  //         placeholder: 'http://abc:1234',
  //         value: this.ipAddress,
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: async (data) => {
  //           console.log('Confirm Ok');
  //           console.log(data);
  //           if (data.IPAddress) {
  //             console.log(data.IPAddress);
  //             this.ipAddress = data.IPAddress;
  //             // this.videoURI = `http://${data.IPAddress}/stream`;
  //             // const options: StreamingVideoOptions = {
  //             //   successCallback: () => { console.log('Video played'); },
  //             //   errorCallback: (e) => { console.log('Error streaming:', e); },
  //             //   orientation: 'landscape',
  //             //   shouldAutoClose: true,
  //             //   controls: false
  //             // };
  //             // const testVideoURI = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  //             // this.streamingMedia.playVideo(testVideoURI, options);
  //             // this.streamingMedia.playVideo(this.videoURI, options);
  //             console.log('should navigate');
  //             const modal = await this.modalController.create({
  //               component: LiveVideoPage,
  //               componentProps: {
  //                 ipAddress: data.IPAddress,
  //               }
  //             });
  //             return await modal.present();
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
