import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { API_KEY, Country } from './models';

export const normalizeSearchText = (q: string) => q.trim().toLowerCase()

@Injectable()
export class NewsDatabase extends Dexie {

  private searchOption: Dexie.Table<Country, string>;
  private searchAPI: Dexie.Table<API_KEY, string>;

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

    this.searchOption = this.table('searchOption')
    this.searchAPI = this.table('searchAPI')
  }

/*   async saveSearchOption(s: SearchOption): Promise<any> {
    const gen = s.genre == Genre.Anime? 0: 1
    s.q = normaizeSearchText(s.q)
    // select count(*)  from searchOption where q = 'abc' and genre = 'anime'
    const resultCount = await this.searchOption
        .where('q').equals(s.q)
        .and(doc => doc.genre == gen)
        .count()

    if (resultCount <= 0)
      return this.searchOption.add(s)
  }

  getSearchOptions(): Promise<SearchOption[]> {
    return this.searchOption.orderBy('q').toArray()
  } */

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

}
