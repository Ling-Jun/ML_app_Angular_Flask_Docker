import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.sass'
})
export class PredictComponent {
  constructor(private http: HttpClient) {

  };

  @Input() height_pred_data: any;
  buttonDisabled: boolean=false;


  submitToPred() {
    console.log("submit data to backend!");


    this.buttonDisabled=!this.buttonDisabled;
    setTimeout(() => {
      this.buttonDisabled = !this.buttonDisabled;
    }, 1000);


    const predict_url = this.height_pred_data.backendHost + this.height_pred_data.backend_url + "/predict";
    this.http.post(predict_url, this.height_pred_data.weight).subscribe({
        next: (response: any) => {
          console.log(response);
          this.height_pred_data.predicted_height = response.prediction;
        },
        error: (error: any) => {
          console.log('Error sending data:', error);
        }
      }
    );
  }


  clickPredictButton(){
    if (this.buttonDisabled){
      return "Wait for Calculation"
    } else {
      return "Predict"
    }
  }

  onClickSomeTextEvent(event: any){
    console.log("data clicked: "+ event.target.innerHTML);
  }

}
