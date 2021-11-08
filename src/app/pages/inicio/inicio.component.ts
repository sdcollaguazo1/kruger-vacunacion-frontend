import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  myType = 'PieChart';
  myData = [
      ['---', 8136000],      
    ];

    myType2 = 'ColumnChart';
    myData2 = [
      ["---", 8.94],
      ["---", 10.49],
      ["---", 19.30],
      ["---", 21.45]
      ];

  myType3 = 'LineChart';
  myData3 = [
    
    ['---',  1000],
    ['---',  1170],
    ['---',  660],
    ['---',  1030]

    ];
    
  constructor() { }

  ngOnInit(): void {
  }

}
