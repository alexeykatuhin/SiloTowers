import { Component, OnInit } from '@angular/core';
import { Tower } from './models/Tower';
import { TowerService } from './services/tower.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  towers :Tower[] =[]
  constructor(private towerService: TowerService){ }
 
  ngOnInit(): void {
    this.towerService.getTowers().subscribe(x=>this.towers = x);
  }
  title = 'client';
}
