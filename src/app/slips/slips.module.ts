import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { SlipDetailEditComponent } from "~/app/slips/slip-detail-edit/slip-detail-edit.component";
import { MyImageAddRemoveComponent } from "~/app/slips/slip-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "~/app/slips/slip-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "~/app/slips/slip-detail-edit/my-list-selector/my-list-selector.component";
import { SlipDetailComponent } from "~/app/slips/slip-detail/slip-detail.component";
import { SlipListComponent } from "~/app/slips/slip-list.component";
import { SlipsRoutingModule } from "~/app/slips/slips-routing.module";
import { SlipEditService } from "~/app/slips/shared/slip-edit.service";
import { SlipService } from "~/app/slips/shared/slip.service";

@NgModule({
    imports: [
        SlipsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SlipListComponent,
        SlipDetailComponent,
        SlipDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        SlipService,
        SlipEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SlipsModule { }
