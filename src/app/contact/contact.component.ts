import { Component, OnInit, Inject } from "@angular/core";
import { BaseComponent } from "../shared/base.component";
import { ActionDialogService } from "../services/action-dialog.service";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "app-contact",
    moduleId: module.id,
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"],
})
export class ContactComponent extends BaseComponent implements OnInit {
    constructor(actionDialogService: ActionDialogService) {
        super(actionDialogService);
    }

    ngOnInit() {}

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
