import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../models';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  qCountry = ''
  tempAPIKey = ''
  searchResults: News[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute
    , private http: HttpClient) { }

  ngOnInit(): void {
    this.qCountry = this.activatedRoute.snapshot.params['country'];
    this.tempAPIKey = this.activatedRoute.snapshot.params['apikey']
    console.info("t country:", this.qCountry);
    console.info("t key:", this.tempAPIKey);
    const url = 'https://newsapi.org/v2/top-headlines?'
    let params= (new HttpParams())
      .set('country', this.qCountry)
      .set('apiKey',this.tempAPIKey);
    
    this.http.get<any>(url, { params:params })
      .toPromise()
      .then(resp => {
        const results = resp['articles'] as any[];
        this.searchResults = results.map(r => {
          return {
            source: r['source'],
            author: r['author'],
            title: r['title'],
            description: r['description'],
            url: r['url'],
            image: r['urlToImage'],
            publishDate: r['publishedAt'],
            content: r['content']
          } as News
        })
        console.info(">>>newsResults: ", this.searchResults)
      })
  }

}
