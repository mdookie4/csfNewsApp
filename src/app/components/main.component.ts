import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsDatabase, normalizeSearchText } from '../news.database';
import { Country } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private newsDB: NewsDatabase) { }

  ngOnInit(): void {
    this.checkAPIKey()
  }

  async checkAPIKey() {
    this.newsDB.checkAPIKey()
      .then(result => {
        //console.info("count: ", result)
        if(result > 0) {
          this.router.navigate(['/countries']);
        } else {
          this.router.navigate(['/settings']);
        }
      })
  }

}
