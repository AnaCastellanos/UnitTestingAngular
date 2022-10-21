import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(
    private loggerService: LoggerService
  ) {}

  public add(a: number, b: number): number {
    this.loggerService.log("Added two numbers");
    return a + b;
  }

  public subtract(a: number, b: number): number {
    this.loggerService.log("Subtract two numbers");
    return a - b;
  }
}
