import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { MenuComponent } from './menu/menu.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { BudgetChartComponent } from './budget-chart/budget-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    MenuComponent,
    HomepageComponent,
    ArticleComponent,
    LoginComponent,
    P404Component,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    BudgetChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
