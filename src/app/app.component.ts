import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngRAG';
  isLoading = false;
  searchQuery = new FormControl("");
  messages = [{
    type: "USER",
    message: "Hi, How can I help you?"
  }];

  constructor(private _service: AppService) {

  }

  submitQuery() {
    this.isLoading = true;
    const query = this.searchQuery.value || "";
    this.searchQuery.setValue("");
    this.messages.push({
      type: "USER",
      message: query
    })
    this._service.searchQuery(query || "").subscribe(res => {
      this.isLoading = false;
      this.messages.push({
        type: "AI",
        message: res.response
      })
    })
  }
}
