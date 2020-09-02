import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: StorageService,
              private camera: Camera,
              private clienteService: ClienteService) {
  }

  async ionViewDidLoad() {
    try {
      const user = this.storage.getLocalUser();
      if (user && user.email) {
        this.email = user?.email;
        this.cliente = await this.clienteService.findByEmail(this.email) as ClienteDTO;
        await this.getImageIfExists();
      } else {
        this.navCtrl.setRoot("HomePage");
      }
    } catch {

    }
  }
  
  async getImageIfExists () {

    try {
      await this.clienteService.getUrlFromBucket(this.cliente.id);
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    } catch (e) {
      this.cliente.imageUrl = null;
    }
  }

  async getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    try { 
      const imageData = await this.camera.getPicture(options);
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    } catch (e) {
      console.log(e.getMessage());
    }

  }
}
