import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DropdownFetchInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`intercepted request to /dropdown-options`);
    if (req.url.endsWith('/dropdown-options')) {
      const filterValue = req.params.get('filter');
      // Simulate backend fetch with delay and suffix
      const optionsBase = [
        'BMW',
        'Audi',
        'VW',
        'Mercedes',
        'Porsche',
        'Tesla',
        'Lada',
        'Opel',
        'Fiat',
        'Ford',
        'Kia',
        'Toyota',
        'Ferrari',
      ];
      const options = optionsBase.map((brand) => `${filterValue} ${brand}`);
      return of(new HttpResponse({ status: 200, body: options })).pipe(delay(1000));
    }
    return next.handle(req);
  }
}
