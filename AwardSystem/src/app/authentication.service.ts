import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }
  static GetData(key: string): string | null {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  static SetDateWithExpiry(key: string, value: string, expiryInMinutes: number) {
    const now = new Date()
    expiryInMinutes = expiryInMinutes * 60000;

    const item = {
      value: value,

      expiry: now.getTime() + expiryInMinutes,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }


  static IsAdmin(): boolean {

    return this.GetData("Admin")?.includes("true") ? true : false;

  }
  static IsRequester(): boolean {
    return this.GetData("Requester")?.includes("true") ? true : false;
  }

  static IsApprover(): boolean {
    return this.GetData("Approver")?.includes("true") ? true : false;
  }
  static IsPublisher(): boolean {
    return this.GetData("Publisher")?.includes("true") ? true : false;
  }

  static Logout() {
    localStorage.clear();
  }
}
