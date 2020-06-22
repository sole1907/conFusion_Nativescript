import { Component, Injectable } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";

@Injectable()
export class ActionDialogService {
    displayActionDialog() {
        // >> action-dialog-code
        let options = {
            title: "More",
            message: "Choose an Action",
            cancelButtonText: "Cancel",
            actions: ["Add to Favorites", "Add Comment"],
        };

        action(options).then((result) => {
            console.log(result);
        });
        // << action-dialog-code
    }
}
