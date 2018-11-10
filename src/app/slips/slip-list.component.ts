import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { Slip } from "./shared/slip.model";
import { SlipService } from "./shared/slip.service";

@Component({
    selector: "slipsList",
    moduleId: module.id,
    templateUrl: "./slip-list.component.html",
    styleUrls: ["./slip-list.component.scss"]
})
export class SlipListComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _slips: ObservableArray<Slip> = new ObservableArray<Slip>([]);
    private _dataSubscription: Subscription;

    constructor(
        private _slipService: SlipService,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._slipService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((slips: Array<Slip>) => {
                    this._slips = new ObservableArray(slips);
                    this._isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

    get slips(): ObservableArray<Slip> {
        return this._slips;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onslipItemTap(args: ListViewEventData): void {
        const tappedslipItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/slips/slip-detail", tappedslipItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
