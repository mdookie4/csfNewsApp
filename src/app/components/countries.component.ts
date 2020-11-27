import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, News } from '../models'
import { NewsDatabase } from '../news.database'

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  tempAPIKey = "9dd16da57f5042cbb27cc421862ac2dd";

  countryList: Country[] = [];
  tempList = []
  keyResult = [];
  //dbCount: number;


  allowedCountries = ['ae','ar', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 
  'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 
  'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 
  'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 
  'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];
  

  returnkey = [];

  constructor(private router: Router, private http: HttpClient, private newsDB: NewsDatabase) { }

  ngOnInit(): void {
    //this.readCountriesFromDB();
    //if countries there, then call
    //let validCountryDB = false;
    this.newsDB.readCountriesCount()
      .then(resp => {
        //console.info(resp);
        return resp as number;
        }
      )
      .then(
        result => {
          if(result > 0) {
            const result = this.newsDB.readCountriesFromDB()
            .then(result => { 
              //console.info("x",result);
              this.countryList = result.map(r=> {
                return r;
              });
              //console.info("countryResult: ", this.countryList);
              return this.countryList;
            })
          }
          else {
            this.callCountryAPI();
          }
        }
      )
  }


  callCountryAPI() {
    let url = 'https://restcountries.eu/rest/v2/alpha/'
    for(let i in this.allowedCountries) {
      //console.info(" ", url+this.allowedCountries[i]);
      const tempUrl = url + this.allowedCountries[i];
      this.http.get<any>(tempUrl)
        .toPromise()
        .then(resp => {
          //console.info(resp.name, " ", resp.flag);
          //const results = resp['results'] as any[];
          this.countryList[i] = {
            code: this.allowedCountries[i],
            name: resp.name,
            flag: resp.flag
          } as Country;
          //console.info(this.countryList[i]);
          this.newsDB.addCountry(this.countryList[i]);
        })
        //console.info(">>>countrylist: ", this.countryList)
    }
  }

  gotoNews(country: string){
    console.info("go to news");
    //const key = this.tempAPIKey;
    const result = this.newsDB.readAPIKey()
      .then(result => { 
        this.keyResult = result.map(r=> {
          return r['key'];
        });
        //console.info("keyresult: ", this.keyResult[0]);
        return this.keyResult[0];
      })
      .then(
        result => {
         this.router.navigate(['/news',country,result]);
        }
      )
  }

}
