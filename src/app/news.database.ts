import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { API_KEY, Country, News } from './models';

export const normalizeSearchText = (q: string) => q.trim().toLowerCase()

@Injectable()
export class NewsDatabase extends Dexie {

  private searchOption: Dexie.Table<Country, string>;
  private searchAPI: Dexie.Table<API_KEY, string>;
  private newsRepo: Dexie.Table<News, string>;

  constructor() {
    super('newsDB')
    //create schema
    this.version(1).stores({
      // index name
      searchOption: 'code'
    })

    this.version(1).stores({
        // index name
        searchAPI: 'key'
      })

    this.version(1).stores({
    // index name
    newsRepo: 'country'
    })

    this.searchOption = this.table('searchOption');
    this.searchAPI = this.table('searchAPI');
    this.newsRepo = this.table('newsRepo');
  }

  checkAPIKey(): Promise<Number> {
    return this.searchAPI.count();    
  }

  async addAPIKey(s: API_KEY):Promise<any> {
    return this.searchAPI.add(s);
  }

  async readCountriesCount():Promise<any> {
    return this.searchOption.count();
  }

  async readCountriesFromDB():Promise<any> {
      return this.searchOption.toArray();
  }

  async readAPIKey():Promise<any> {
    return this.searchAPI.toArray();
  }

  async deleteAPIKey(s: string):Promise<any> {
      return this.searchAPI.delete(s);
  }

  addCountry(s: Country):Promise<any> {
      return this.searchOption.add(s);
  }

  addNewsInDB(s: News):Promise<any> {
    return this.newsRepo.add(s);
  }  

}
