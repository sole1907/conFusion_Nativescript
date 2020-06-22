import { Component, OnInit, Inject } from "@angular/core";
import { BaseComponent } from "../shared/base.component";
import { ActionDialogService } from "../services/action-dialog.service";

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
}
