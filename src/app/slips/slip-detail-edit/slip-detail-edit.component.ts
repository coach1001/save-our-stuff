import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { slipEditService } from "../shared/slip-edit.service";
import { Slip } from "../shared/slip.model";
import { SlipService } from "../shared/slip.service";
import { slipClassList, slipDoorList, slipSeatList, slipTransmissionList } from "~/app/slips/slip-detail-edit/constants";

@Component({
    moduleId: module.id,
    selector: "slipDetailEdit",
    templateUrl: "./slip-detail-edit.component.html",
    styleUrls: ["./slip-detail-edit.component.scss"]
})
export class SlipDetailEditComponent implements OnInit {
    private _slip: Slip;
    private _slipClassOptions: Array<string> = [];
    private _slipDoorOptions: Array<number> = [];
    private _slipSeatOptions: Array<string> = [];
    private _slipTransmissionOptions: Array<string> = [];
    private _isSlipImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _slipService: SlipService,
        private _slipEditService: slipEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.initializeEditOptions();

        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const slipId = params.id;

                this._slip = this._slipEditService.startEdit(slipId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get slip(): Slip {
        return this._slip;
    }

    get pricePerDay(): number {
        return this._slip.price;
    }

    set pricePerDay(value: number) {
        // force iOS UISlider to work with discrete steps
        this._slip.price = Math.round(value);
    }

    get luggageValue(): number {
        return this._slip.luggage;
    }

    set luggageValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._slip.luggage = Math.round(value);
    }

    get slipClassOptions(): Array<string> {
        return this._slipClassOptions;
    }

    get slipDoorOptions(): Array<number> {
        return this._slipDoorOptions;
    }

    get slipSeatOptions(): Array<string> {
        return this._slipSeatOptions;
    }

    get slipTransmissionOptions(): Array<string> {
        return this._slipTransmissionOptions;
    }

    get slipImageUrl(): string {
        return this._slip.imageUrl;
    }

    set slipImageUrl(value: string) {
        this._slip.imageUrl = value;
        this._isSlipImageDirty = true;
    }

    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDoneButtonTap(): void {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Firebase database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************************************************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isslipImageDirty && this._slip.imageUrl) {
            queue = queue
                .then(() => this._slipService.uploadImage(this._slip.imageStoragePath, this._slip.imageUrl))
                .then((uploadedFile: any) => {
                    this._slip.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._slipService.update(this._slip))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/slips"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        const queue = Promise.resolve();
        queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
            .then(() => this._routerExtensions.navigate(["/slips"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }

    private initializeEditOptions(): void {
        for (const classItem of slipClassList) {
            this._slipClassOptions.push(classItem);
        }

        for (const doorItem of slipDoorList) {
            this._slipDoorOptions.push(doorItem);
        }

        for (const seatItem of slipSeatList) {
            this._slipSeatOptions.push(seatItem);
        }

        for (const transmissionItem of slipTransmissionList) {
            this._slipTransmissionOptions.push(transmissionItem);
        }
    }
}
