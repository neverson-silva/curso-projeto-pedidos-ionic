import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';


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
  profileImage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: StorageService,
              private camera: Camera,
              private alert: AlertController,
              private sanitizer: DomSanitizer,
              private clienteService: ClienteService) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  async ionViewDidLoad() {
    await this.loadData();
  }

  async loadData() {
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
      const response = await this.clienteService.getUrlFromBucket(this.cliente.id);
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;

      const dataUrl = await this.blobToDataURL(response);
      if (dataUrl) {
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(dataUrl as string);
      }

    } catch (e) {
      this.cliente.imageUrl = null;
    }
  }

  async getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    try { 
      const imageData = await this.camera.getPicture(options);
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    } catch (e) {
      console.log(e.getMessage());
      this.cameraOn = false;
      const alert = this.alert.create({
        title: 'erro ao abrir câmera',
        message: e.getMessage(),
        buttons: [
          {text: 'OK' }
        ]
      });
      alert.present();

    }

  }

  async getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    try { 
      const imageData = await this.camera.getPicture(options);
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    } catch (e) {
      this.cameraOn = false;
      const alert = this.alert.create({
        title: 'erro ao abrir câmera',
        message: e.getMessage(),
        buttons: [
          {text: 'OK' }
        ]
      });
      alert.present();
    }

  }
  async sendPicture() {
    try {

      const response = await this.clienteService.uploadPicture(this.picture);
      this.picture = null;
      await this.getImageIfExists();
    } catch(e) {
      const alert = this.alert.create({
        title: 'erro ao abrir câmera',
        message: e.getMessage(),
        buttons: [
          {text: 'OK' }
        ]
      });
      alert.present();
    }
  }

  cancel() {
    this.picture = null
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }
}
