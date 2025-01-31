import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    username: '',
    followees: [],
    followers: []
  };
  isEditing: boolean = false;
  editForm: FormGroup;
  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      username: new FormControl('', Validators.required)
    });
   }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "usuario");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }
  async updateUsername(username:any){
     console.log('update username');
  this.user_data.username = this.editForm.value.username;
  this.update();
  this.isEditing = false;
  }
  toggleEditForm() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm.patchValue({ username: this.user_data.username });
    }
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

}