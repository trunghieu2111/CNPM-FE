import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceLogin {
    flagPermission = 1;
    flagLogin = true;
    constructor() { }
}
