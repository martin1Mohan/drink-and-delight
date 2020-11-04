/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-11-04 23:05:33
 * @modify date 2020-11-04 23:05:33
 * @desc Used to shate data beteen ocmponents
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public resetPasswordData = new BehaviorSubject<any>(null);

  constructor() { }
}
