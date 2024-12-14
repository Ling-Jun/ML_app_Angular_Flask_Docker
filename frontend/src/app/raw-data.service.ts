import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {

  constructor() {

  }

  heightPredDataScheme = {
    title : 'Height prediction',
    weight : 0,
    predicted_height : "",
    backendHost : 'localhost',
    backend_url : "/api",
    referenceURL: "https://www.medicalnewstoday.com/articles/323446"
  };

  rawHeightWeightCorrData = [
    {"Point": "5", "Height": "180", "Weight": "180", "Salary": "10"},
    {"Point": "4", "Height": "170", "Weight": "160", "Salary": "10"},
    {"Point": "3", "Height": "150", "Weight": "120", "Salary": "10"},
    {"Point": "2", "Height": "130", "Weight": "90", "Salary": "10"},
    {"Point": "1", "Height": "110", "Weight": "50", "Salary": "10"},
  ];


  clearData(){
    console.log('Clearing list');
    console.log("The list of points was: " + this.rawHeightWeightCorrData);
    return []
  }


  returnData(){
    console.log('Returning list');
    console.log("The list of points is: " + this.rawHeightWeightCorrData);
    return this.rawHeightWeightCorrData
  }


  
}
