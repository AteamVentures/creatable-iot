import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.page.html',
  styleUrls: ['./live-video.page.scss'],
})
export class LiveVideoPage implements OnInit {

  @Input() ipAddress: string;


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
