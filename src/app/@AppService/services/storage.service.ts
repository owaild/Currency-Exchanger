import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setObject(key: string, data: Object) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (e) {
      throw new Error('Provided data is not serializable!');
    }
  }

  public getObject(key: string): any {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  public setItem(key: string, data: string): string {
    localStorage.setItem(key, data);
    return data;
  }

  public getItem(key: string): string {
    const data = localStorage.getItem(key);
    return data as string;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  constructor() {
    if (typeof Storage === 'undefined') {
      throw new Error('StorageService: Local storage is not supported');
    }
  }
}
