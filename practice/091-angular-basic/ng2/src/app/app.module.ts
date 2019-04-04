import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './search/result/result.component';
import { PathTestComponent } from './search/path-test/path-test.component';
import { BindingComponent } from './binding/binding.component';
import { EventComponent } from './event/event.component';
import { TwoWayComponent } from './two-way/two-way.component';
import { MyInputComponent } from './my-input/my-input.component';
import { BlackBoardComponent } from './black-board/black-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    PathTestComponent,
    BindingComponent,
    EventComponent,
    TwoWayComponent,
    MyInputComponent,
    BlackBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
