import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class PhotosService {
  public photos:UserPhoto[]=[];
  private PHOTO_STORAGE: string = 'photos';


  private async savePicture(photos:Photo){
    //convert to base 64
    const base64Data=await this.readAsBase64(photos);
    //save a file name and write to system
    const fileName= Date.now()+'.jpeg';
      const savedFile= await Filesystem.writeFile({
      path:fileName,
      data:base64Data,
      directory:Directory.Data
      });

      //display in browser
      return{
        filepath:fileName,
        webviewPath:photos.webPath!
      }
  }

  constructor() { }
  public async addNewToGallery(){ 
    const capturedPhoto= await Camera.getPhoto({ 
      resultType:CameraResultType.Uri, 
      source:CameraSource.Camera, 
      quality:100 });

      // this.photos.unshift({
      //   filepath:"soon...",
      //   webviewPath:capturedPhoto.webPath!
      // })

      const savedImageFiles=await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFiles);

      Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });

      
    }
    public async loadSaved() {
      // Retrieve cached photo array data
      const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
      this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];
    
      // more to come...
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
    private async readAsBase64(photo: Photo) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
    
      return await this.convertBlobToBase64(blob) as string;
    }
    private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

export interface UserPhoto{
  filepath:string;
  webviewPath?:string;
}
