import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Slip } from "./slip.model";

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable()
export class SlipService {
    private static cloneUpdateModel(slip: Slip): object {
        return editableProperties.reduce((a, e) => (a[e] = slip[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _slips: Array<Slip> = [];

    constructor(private _ngZone: NgZone) { }

    getslipById(id: string): Slip {
        if (!id) {
            return;
        }

        return this._slips.filter((slip) => {
            return slip.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "slips";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).pipe(catchError(this.handleErrors));
    }

    update(slipModel: Slip): Promise<any> {
        const updateModel = SlipService.cloneUpdateModel(slipModel);

        return firebase.update("/slips/" + slipModel.id, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.storage.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Slip> {
        this._slips = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._slips.push(new Slip(data[id]));
                }
            }
        }

        return this._slips;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}
