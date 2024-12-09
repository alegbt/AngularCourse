import { Injectable, signal } from '@angular/core';

import { Permission } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  activePermission = signal<Permission>('guest');

  authenticate(email: string, password: string) {
    console.log(email, password);
    if (email === 'a' && password === 'a') {
      this.activePermission.set('admin');
    } else if (email === 'u' && password === 'u') {
      this.activePermission.set('user');
    } else {
      this.activePermission.set('guest');
    }
  }

  logout() {
    this.activePermission.set('guest');
  }
}
