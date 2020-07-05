import { Component, OnInit, Inject } from "@angular/core";
import { BaseComponent } from "../shared/base.component";
import { ActionDialogService } from "../services/action-dialog.service";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Email from "nativescript-email";
import * as TNSPhone from "nativescript-phone";

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

    sendEmail() {
        Email.available().then((avail: boolean) => {
            if (avail) {
                Email.compose({
                    to: ["confusion@food.net"],
                    subject: "[ConFusion]: Query",
                    body: "Dear Sir/Madam:",
                });
            } else console.log("No Email Configured");
        });
    }

    /// Dial a phone number.
    public callRestaurant() {
        const phoneNumber = "415-123-4567";
        TNSPhone.requestCallPermission(
            "You should accept the permission to be able to make a direct phone call."
        )
            .then(() => TNSPhone.dial(phoneNumber, false))
            .catch(() => TNSPhone.dial(phoneNumber, true));
    }
}
