import { Injectable } from "@angular/core";

import { Slip } from "./slip.model";
import { SlipService } from "./slip.service";

@Injectable()
export class SlipEditService {
    private _editModel: Slip;

    constructor(private _slipService: SlipService) {}

    startEdit(id: string): Slip {
        this._editModel = null;

        return this.getEditableslipById(id);
    }

    getEditableslipById(id: string): Slip {
        if (!this._editModel || this._editModel.id !== id) {
            const slip = this._slipService.getslipById(id);

            // get fresh editable copy of slip model
            this._editModel = new Slip(slip);
        }

        return this._editModel;
    }
}
