import { ShareUiService } from 'src/app/services/share_ui.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  title = 'Home';
  categories = true;
  trending = false;
  profile = false;
  categoriesData: any;
  parentcategory: any;

  sliderOptions = {
    speed: 300,
    autoplay: false
  };
  catName: any;

  constructor(private categorieService: CategoriesService,
              private router: Router,
              private shareUi: ShareUiService) {
  }

  ngOnInit() {
    this.categorieService.GetCategories().subscribe(data => {
      this.categoriesData = data.data;
      this.categoriesData.forEach(element => {
        console.log(` ${element.parent_category_id}`);
        // if (element.parent_category_id === null) {
        //   console.log(`yes ${element}`);
        // } else {
        //   console.log(`no ${element}`);
        // }
      });
    });
  }

  segmentChanged(element) {
    switch (element.detail.value) {
      case 'categories':
        this.title = 'Home';
        this.categories = true;
        this.trending = false;
        this.profile = false;
        break;
      case 'trending':
        this.title = 'Trending';
        this.categories = false;
        this.trending = true;
        this.profile = false;
        break;
      case 'profile':
        this.title = 'Profile';
        this.categories = false;
        this.trending = false;
        this.profile = true;
        break;
      default:
        break;
    }
  }

  moveToSubCategorie(cat) {
    this.shareUi.ShowErrorAlert(`This Categories don't have sub categories`, `No sub categories yet`);
          console.log(`no`);
          this.router.navigate([`/members/sub-categorie/${cat.id}`]);

  }

}
