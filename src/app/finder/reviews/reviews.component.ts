import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/restaurant-review.model';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  public restaurant: Restaurant;

  constructor(private route: ActivatedRoute, private service: RestaurantService, private loadingController: LoadingController,
              private router: Router) {
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
   * Navigate back to restaurants finder page
   */
  public returnToFinder() {
    this.router.navigate(['/tabs', 'finder']);
  }

  /**
   * Get a restaurant by Id
   * @param id The Restaurant Id
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
