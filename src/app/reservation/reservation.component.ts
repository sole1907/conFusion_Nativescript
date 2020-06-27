import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import {
    ModalDialogService,
    ModalDialogOptions,
} from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ReservationService } from "../services/reservation.service";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import * as enums from "tns-core-modules/ui/enums";

@Component({
    selector: "app-reservation",
    moduleId: module.id,
    templateUrl: "./reservation.component.html",
    styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
    reservation: FormGroup;
    showLeftCard: boolean = true;
    showRightCard: boolean = false;
    leftCard: View;
    rightCard: View;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private reservationService: ReservationService,
        private page: Page
    ) {
        this.reservation = this.formBuilder.group({
            guests: 3,
            smoking: false,
            dateTime: ["", Validators.required],
        });
    }

    createModalView(args) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false,
        };

        this.modalService
            .showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({ guests: result });
                } else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result });
                }
            });
    }

    ngOnInit() {}

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        } else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text });
    }

    onSubmit() {
        this.reservationService.addReservation(
            JSON.stringify(this.reservation.value)
        );
        this.animateLeft();
    }

    animateLeft() {
        this.leftCard = this.page.getViewById<View>("leftCard");
        this.rightCard = this.page.getViewById<View>("rightCard");

        this.rightCard
            .animate({
                translate: { x: 2000, y: 0 },
            })
            .then(() => {
                this.leftCard
                    .animate({
                        translate: { x: -2000, y: 0 },
                        duration: 500,
                        curve: enums.AnimationCurve.easeInOut,
                    })
                    .then(() => {
                        this.showLeftCard = false;
                        this.showRightCard = true;
                        this.rightCard.animate({
                            translate: { x: 0, y: 0 },
                            duration: 500,
                            curve: enums.AnimationCurve.easeInOut,
                        });
                    });
            });
    }
}
