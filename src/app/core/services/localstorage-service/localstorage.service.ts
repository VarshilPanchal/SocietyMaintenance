import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    setItem(key: string, value: any, storageType?: boolean, componentName?: any) {
        if (storageType) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    getItem(key: string, defaultValue?: any, storageType?: boolean, componentName?: any): any {
        if (storageType) {
            const localStorageObject = localStorage.getItem(key)
            if (localStorageObject) {
                return JSON.parse(localStorageObject);
            } else {
                return defaultValue;
            }
        } else {
            const sessionStorageObject = sessionStorage.getItem(key)
            if (sessionStorageObject) {
                return JSON.parse(sessionStorageObject);
            } else {
                return defaultValue;
            }
        }
    }

    public setToken(key: string, token: any, defaultValue?: any, storageType?: boolean, componentName?: any): any {
        if (storageType) {
            localStorage.setItem(key, JSON.stringify(token));
        } else {
            sessionStorage.setItem(key, JSON.stringify(token));
        }
    }

    public getToken(key: string, defaultValue?: any, storageType?: boolean, componentName?: any): any {
        if (storageType) {
            const localStorageObject = localStorage.getItem(key)
            if (localStorageObject) {
                return JSON.parse(localStorageObject);
            }
        } else {
            const sessionStorageObject = sessionStorage.getItem(key)
            if (sessionStorageObject) {
                return JSON.parse(sessionStorageObject);
            }
        }
    }

    removeItem(key: string): any {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }

    getLoginUserId(): any {
        const user = this.getItem('user');
        return user ? user.id : '';
    }
    getLoginUserName(): any {
        const user = this.getItem('user');
        return user ? user.user_name : '';
    }

    getLoginUserObject(): any {
        const user = this.getItem('user');
        return user;
    }

    getheme(): any {
        return this.getItem('iconic_worker_theme');
    }

    setTheme(themeName: string): void {
        sessionStorage.setItem('iconic_worker_theme', JSON.stringify(themeName));
    }

    logout(): any {
        sessionStorage.clear();
        localStorage.clear();
        // setTimeout(() => {
        window.location.reload();
        // }, 500);
    }

}
