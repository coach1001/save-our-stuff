import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SlipDetailEditComponent } from "~/app/slips/slip-detail-edit/slip-detail-edit.component";
import { SlipDetailComponent } from "~/app/slips/slip-detail/slip-detail.component";
import { SlipListComponent } from "~/app/slips/slip-list.component";

const routes: Routes = [
    { path: "", component: SlipListComponent },
    { path: "slip-detail/:id", component: SlipDetailComponent },
    { path: "slip-detail-edit/:id", component: SlipDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SlipsRoutingModule { }
