import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

export interface ImageResponse {
  success: number;
  data: { avatar_image: { url: string } };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private user;

  constructor(private camera: Camera, public actionSheetController: ActionSheetController, private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user"));
   }

   selectUserImage(): string {
     if(this.user.avatar_image.url === null) {
      return "https://bogoambientalstorage.s3.amazonaws.com/uploads/user/default.jpg"; 
     }else {
       return this.user.avatar_image.url;
     }
   }

   changeUserImage(imageUrl: string): void {
     let img = document.querySelector("#img-user");
     img.setAttribute('src', imageUrl);
   }

   pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data = { "avatar_image": imageData }
      
      this.http.post<ImageResponse>('http://localhost:3000/api/v1/avatar_images', data).subscribe(
        res => {
          if(res.success === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.changeUserImage(res.data.avatar_image.url);
          }
        },
        error =>  console.log(error)
      );
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Seleccionar recurso de la imagen",
      buttons: [{
        text: 'Cargar de la galeria',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'usar camara',
        icon: 'camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  ngOnInit() { }

}
