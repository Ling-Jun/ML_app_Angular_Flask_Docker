import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RawDataService } from './raw-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  height_pred_data = this.rawData.heightPredDataScheme;
  rawHeightWeightData = this.rawData.rawHeightWeightCorrData;  


  constructor(private http: HttpClient, 
    public rawData: RawDataService,
    private titleService: Title
    ) {
    titleService.setTitle("Height Prediction from Weight")
  };


  ngOnInit() {
    this.http.get('/assets/config.json').subscribe((config: any) => {
      this.height_pred_data.backendHost = config.backendHost;
    });
  }


  clearPointsList(){
    this.rawHeightWeightData = this.rawData.clearData();
  }

  returnPointsList(){
    this.rawHeightWeightData = this.rawData.returnData();
  }

}
