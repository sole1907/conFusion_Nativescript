import { Component, OnInit, Inject } from "@angular/core";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";
import { ActionDialogService } from "../services/action-dialog.service";
import { BaseComponent } from "../shared/base.component";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "app-about",
    moduleId: module.id,
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"],
})
export class AboutComponent extends BaseComponent implements OnInit {
    leaders: Leader[];
    errMess: string;

    constructor(
        private leaderservice: LeaderService,
        actionDialogService: ActionDialogService,
        @Inject("baseURL") private baseURL
    ) {
        super(actionDialogService);
    }

    ngOnInit() {
        this.leaderservice.getLeaders().subscribe(
            (leaders) => (this.leaders = leaders),
            (errmess) => (this.errMess = <any>errmess)
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
