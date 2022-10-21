import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public log(message: string): void {
    console.log(message);
  }

  public log1(message: string): void {
    console.log(message);
  }

  public log2(message: string): void {
    console.log(message);
  }

  public log3(message: string): void {
    console.log(message);
  }

}
