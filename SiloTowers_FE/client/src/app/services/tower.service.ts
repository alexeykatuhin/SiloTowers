import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicator } from '../models/Indicator';
import { Tower } from '../models/Tower';

@Injectable()
export class TowerService
{
    constructor(private http: HttpClient){
    }

    getTowers(){
        return this.http.get<Tower[]>(`api/tower`)
    }

    editIndicator(indicator: Indicator){
        return this.http.put<Tower>(`api/tower`,indicator)
    }
}