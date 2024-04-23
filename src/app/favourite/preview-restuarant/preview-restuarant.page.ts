import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Restaurant } from 'src/app/models/restaurant.model';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-preview-restuarant',
  templateUrl: './preview-restuarant.page.html',
  styleUrls: ['./preview-restuarant.page.scss'],
})
export class PreviewRestuarantPage implements OnInit {
  public restaurant: Restaurant;

  constructor(private route: ActivatedRoute, private service: RestaurantService, private loadingController: LoadingController,
    private router: Router, private photoViewer: PhotoViewer, private alertController: AlertController) {
      this.restaurant = new Restaurant();
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.getRestuarant(params.id);
      }
    });
  }

  /**
   * Navigate back to favourite list
   */
  public returnToFav() {
    this.router.navigate(['/tabs', 'favourite']);
  }

  /**
   * View the restaurant image
   * @param image The restaurant image
   */
  public openPhoto(image: string) {
    this.photoViewer.show(image);
  }

  /**
   * View the Opening hours alert
   */
  public async showAlert() {
    let text = '';
    text += 'Monday: ' + this.restaurant.monday + '<br />';
    text += 'Tuesday: ' + this.restaurant.tuesday + '<br />';
    text += 'Wednesday: ' + this.restaurant.wednesday + '<br />';
    text += 'Thursday: ' + this.restaurant.thursday + '<br />';
    text += 'Friday: ' + this.restaurant.friday + '<br />';
    text += 'Saturday: ' + this.restaurant.saturday + '<br />';
    text += 'Sunday: ' + this.restaurant.sunday + '<br />';

    const alert = await this.alertController.create({
      header: 'Opening Hours',
      message: text,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /**
   * Get the restaurant by Id
   * @param id The restaurant id
   */
  private async getRestuarant(id: string) {
    const loadingElement = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });
    if (!this.restaurant.id || this.restaurant.id === 0 ) {
      await loadingElement.present();
    }

    this.service.getById(id).subscribe(async (res: Restaurant) => {
      this.restaurant = res;
      await loadingElement.dismiss();
    });
  }
}
