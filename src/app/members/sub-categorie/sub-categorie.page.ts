import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sub-categorie',
  templateUrl: './sub-categorie.page.html',
  styleUrls: ['./sub-categorie.page.scss'],
})
export class SubCategoriePage implements OnInit {
  subCat: any;
  subCategorieData: any;
  constructor(private activatedRoute: ActivatedRoute,
              private categorieService: CategoriesService) { }

  ngOnInit() {
    this.subCat = this.activatedRoute.snapshot.paramMap.get('id');
    this.categorieService.GetCategorieschildren(this.subCat).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.subCategorieData = data.data;
        console.log(this.subCategorieData);
      }, 2000);
     });
  }
}
