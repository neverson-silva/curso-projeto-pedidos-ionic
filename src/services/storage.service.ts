import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/localUser';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if (!user || user == null) {
            return null;
        }
        return JSON.parse(user);
    }

    setLocalUser(user: LocalUser) {

        if (user == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }

    
}