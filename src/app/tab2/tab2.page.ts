import { Component } from '@angular/core';
import { PhotosService }  from '../services/photos.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
  constructor(public photoService: PhotosService ) {}
  
    addPhotoToGallery()
  {
    this.photoService.addNewToGallery();
  }
}
