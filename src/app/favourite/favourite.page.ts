import { Component, OnInit } from '@angular/core';
import { Favourite } from '../models/favourite.model';
import { FavouriteService } from '../services/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  public favs: Favourite[];

  constructor(private favService: FavouriteService, private router: Router) {
    this.favs = new Array<Favourite>();
  }

  ngOnInit() {
    this.getFavourites();
  }

  ionViewWillEnter() {
    this.getFavourites();
  }

  /**
   * Navigate to a restaurant preview page
   * @param id The id of the restaurant
   */
  public showRestaurant(id: number) {
    this.router.navigateByUrl(`/tabs/favourite/preview/${id}`);
  }

  /**
   * Delete restaurant from favourite list
   * @param id The id of the restaurant
   */
  public deleteFromFavourite(restaurantId: number) {
    this.favService.delete(restaurantId).subscribe((favs: Favourite[]) => {
      this.favs = favs;
    });
  }

  /**
   * Get all restaurants
   */
  private getFavourites() {
    this.favService.getAll().subscribe(x => this.favs = x);
  }
}
