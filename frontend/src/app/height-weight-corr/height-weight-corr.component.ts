import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-height-weight-corr',
  templateUrl: './height-weight-corr.component.html',
  styleUrl: './height-weight-corr.component.sass'
})
export class HeightWeightCorrComponent implements OnInit {
  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
    this.chartBorder = '2px solid blue'
  }

  @Input() heightWeightData: any;
  @Output() clearPoints = new EventEmitter();
  @Output() returnPoints = new EventEmitter();
  chartBorder = "";
  clickedClearButton = false;
  clearButtonDisabled: boolean=false;

  createArrayFromClicking(index:number){
    console.log("clicked data point: "+ index)
    // console.log("total array length:"+ this.heightWeightData.length);
    let arr = new Array(this.heightWeightData.length).fill(null);
    arr[index] = index;
    console.log(arr);
    return arr
  }

  resultArr: any[]=[];

  onClickPointsText(index: number){
    this.resultArr = this.createArrayFromClicking(index);
  }

  onClearClick(){
    this.clearPoints.emit();
    this.clickedClearButton = !this.clickedClearButton;
    console.log(this.clickedClearButton);
    this.clearButtonDisabled = true;
  }

  clearButtonText(){
    if (this.clearButtonDisabled){
      return "Click Return Points to enable"
    } else {
      return "Clear Points"
    }
  }

  clearButtonTextColor(){
    if(this.clickedClearButton){
      return ''
    } else {
      return 'right-side'
    }
  }

  onReturnDataClick(){
    this.returnPoints.emit();
    this.clearButtonDisabled = false;
  }



  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);


  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }


  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 250])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 250])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.heightWeightData)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d.Weight))
    .attr("cy",  (d: any) => y(d.Height))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.heightWeightData)
    .enter()
    .append("text")
    .text( (d: any) => d.Point)
    .attr("x", (d: any) => x(d.Weight))
    .attr("y", (d: any)  => y(d.Height))
  }

}
