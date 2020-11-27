import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDatabase, normalizeSearchText } from '../news.database';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { API_KEY } from '../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private newsDB: NewsDatabase) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      apikey: this.fb.control('',[Validators.required])
    })
  }

  goback() {
    this.router.navigate(['/countries']);
  }

  async addkey() {
    const opt: API_KEY = {
      key: this.settingsForm.get('apikey').value
    }
    await this.newsDB.addAPIKey(opt)
    this.router.navigate(['/countries'])
  }

  //deletekey() {}
  async deletekey() {
    const opt: string = this.settingsForm.get('apikey').value;
    await this.newsDB.deleteAPIKey(opt);
  }

}
