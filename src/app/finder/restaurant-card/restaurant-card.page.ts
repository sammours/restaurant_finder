import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { ReviewsComponent } from '../reviews/reviews.component';
import { Restaurant } from '../../models/restaurant.model';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourite.service';
import { Favourite } from 'src/app/models/favourite.model';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.page.html',
  styleUrls: ['./restaurant-card.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardPage implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() favs: Favourite[];

  public rating: number;

  @Output() favClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private alertController: AlertController, private photoViewer: PhotoViewer, private router: Router,
              private favouriteService: FavouriteService, private ref: ChangeDetectorRef, private launchNavigator: LaunchNavigator,
              private platform: Platform) {
                this.rating = 0;
              }

  ngOnInit() {
    this.calculateStars();
  }

  /**
   * Display the opening hours alert
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
   * Navigate to show reviews page
   */
  public async showReviews() {
    this.router.navigateByUrl(`/tabs/finder/reviews/${this.restaurant.id}`);
  }

  /**
   * View the restaurant image
   * @param image The restaurant image
   */
  public openPhoto(image: string) {
    this.platform.ready().then(() => {
        this.photoViewer.show(image);
      });
  }

  public openMap() {
    const address = `${this.restaurant.street}, ${this.restaurant.postalCode} ${this.restaurant.city}`;
    const options: LaunchNavigatorOptions = {
      start: address
      // app: LaunchNavigator.APPS.UBER
    };

    this.launchNavigator.navigate(address, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  /**
   * Add or remove a restaurant to or from favourite 
   */
  public toggleToFavourite() {
    const fav = new Favourite();
    fav.name = this.restaurant.name;
    fav.restaurantId = this.restaurant.id;
    if (this.isFav()) {
      this.favouriteService.delete(fav.restaurantId).subscribe(x => {
        this.favClick.emit();
        this.ref.markForCheck();
      });
    } else {
      this.favouriteService.add(fav).subscribe(x => {
        this.favClick.emit();
        this.ref.markForCheck();
      });
    }
  }

  /**
   * Check if restaurant is in favourite list
   */
  public isFav(): boolean {
    if (this.favs) {
      return this.favs.find(x => x.restaurantId === this.restaurant.id) != null;
    }

    return false;
  }

  /**
   * Calculate restaurant stars
   */
  public calculateStars() {
    const star5 = this.restaurant.reviews.filter(x => x.rating === 5);
    const star4 = this.restaurant.reviews.filter(x => x.rating === 4);
    const star3 = this.restaurant.reviews.filter(x => x.rating === 3);
    const star2 = this.restaurant.reviews.filter(x => x.rating === 2);
    const star1 = this.restaurant.reviews.filter(x => x.rating === 1);

    const star5Length = star5 ? star5.length : 0;
    const star4Length = star4 ? star4.length : 0;
    const star3Length = star3 ? star3.length : 0;
    const star2Length = star2 ? star2.length : 0;
    const star1Length = star1 ? star1.length : 0;
    this.rating =  Math.floor((5 * star5Length + 4 * star4Length + 3 * star3Length + 2 * star2Length + 1 * star1Length) /
            (star5Length + star4Length + star3Length + star2Length + star1Length));
  }
}
