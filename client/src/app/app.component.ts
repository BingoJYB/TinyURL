import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    url: String;
    tinyBaseURL: String = 'http://daiml.er';
    response: any;

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
    }

    redirectURL() {
        this.httpService.getURL(this.url.split('/').pop()).subscribe(res => {
            if (res === 'INVALID SHORT URL!')
                this.response = res;
            else
                this.response = 'ORIGINAL URL IS: ' + res;
        });
    }

    shortenURL() {
        this.httpService.addTinyURL({
            longURL: this.url,
            tinyBaseURL: this.tinyBaseURL
        }).subscribe(res => {
            if (res === 'INVALID ORIGINAL URL!')
                this.response = res;
            else
                this.response = 'SHORT URL IS: ' + res;
        });
    }
}
