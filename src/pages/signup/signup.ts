import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private cidadeService: CidadeService,
              private clienteService: ClienteService,
              private estadoService: EstadoService,
              private alertCtl: AlertController  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]    


    });
  }

  async ionViewDidLoad() {
    
    try {
      this.estados = await this.estadoService.findAll();
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      await this.updateCidades();
    } catch (e) {
      console.log(e);
    }


  }

  async updateCidades() {
    try {
      const estadoId = this.formGroup.value.estadoId;
      this.cidades = await this.cidadeService.findAll(estadoId);
      this.formGroup.controls.cidadeId.setValue(null);
    } catch (e) {
      console.log(e);
    }

  };

  async signupUser() {
    try {
      await this.clienteService.insert(this.formGroup.value);
      await this.showOk();
    } catch(e) {

    }

  }

  async showOk() {
    let alert = this.alertCtl.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok', 
          handler: () => {
            this.navCtrl.setRoot("HomePage");
          }
        }
      ]
    });
    alert.present();
  }

}
