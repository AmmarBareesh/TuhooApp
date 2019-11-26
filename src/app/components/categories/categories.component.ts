import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { ShareUiService } from 'src/app/services/share_ui.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoriesData: any;

  constructor(private categorieService: CategoriesService,
              private router: Router,
              private shareUi: ShareUiService) { }

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
  moveToSubCategorie(cat) {
    this.shareUi.ShowErrorAlert(`This Categories don't have sub categories`, `No sub categories yet`);
    console.log(`no`);
    this.router.navigate([`/members/sub-categorie/${cat.id}`]);
  }
}
