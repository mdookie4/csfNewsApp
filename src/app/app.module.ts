import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings.component';
import { CountriesComponent } from './components/countries.component';
import { NewsComponent } from './components/news.component';
import { MainComponent } from './components/main.component';
import { NewsDatabase } from './news.database';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Routes = [
  {path:'',component:MainComponent},
  {path:'settings',component:SettingsComponent},
  {path:'countries',component:CountriesComponent},
  {path:'news/:country/:apikey',component:NewsComponent},
  {path:'**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CountriesComponent,
    NewsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NewsDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
