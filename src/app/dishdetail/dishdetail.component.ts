import { Component, OnInit, Inject, ViewContainerRef } from "@angular/core";
import { Dish } from "../shared/dish";
import { Comment } from "../shared/comment";
import { DishService } from "../services/dish.service";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { FavoriteService } from "../services/favorite.service";
import { Toasty } from "nativescript-toasty";
import { action } from "tns-core-modules/ui/dialogs";
import { CommentComponent } from "../comment/comment.component";
import {
    ModalDialogService,
    ModalDialogOptions,
} from "nativescript-angular/modal-dialog";

@Component({
    selector: "app-dishdetail",
    moduleId: module.id,
    templateUrl: "./dishdetail.component.html",
    styleUrls: ["./dishdetail.component.css"],
})
export class DishdetailComponent implements OnInit {
    dish: Dish;
    comment: Comment;
    errMess: string;
    avgstars: string;
    numcomments: number;
    favorite: boolean = false;

    constructor(
        private dishservice: DishService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private favoriteservice: FavoriteService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        @Inject("baseURL") private baseURL
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(
                switchMap((params: Params) =>
                    this.dishservice.getDish(params["id"])
                )
            )
            .subscribe(
                (dish) => {
                    this.dish = dish;
                    this.favorite = this.favoriteservice.isFavorite(
                        this.dish.id
                    );
                    this.numcomments = this.dish.comments.length;

                    let total = 0;
                    this.dish.comments.forEach(
                        (comment) => (total += comment.rating)
                    );
                    this.avgstars = (total / this.numcomments).toFixed(2);
                },
                (errmess) => {
                    this.dish = null;
                    this.errMess = <any>errmess;
                }
            );
    }

    addToFavorites() {
        if (!this.favorite) {
            console.log("Adding to Favorites", this.dish.id);
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
            const toast = new Toasty(
                "Added Dish " + this.dish.id,
                "short",
                "bottom"
            );
            toast.show();
        }
    }

    goBack(): void {
        this.routerExtensions.back();
    }

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
            if (result === "Add to Favorites") {
                this.addToFavorites();
            } else if (result === "Add Comment") {
                this.createModalView();
            }
        });
        // << action-dialog-code
    }

    createModalView() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            fullscreen: false,
        };

        this.modalService
            .showModal(CommentComponent, options)
            .then((result: any) => {
                this.dish.comments.push(result);
                const toast = new Toasty(
                    "Added Comment Successfully",
                    "short",
                    "bottom"
                );
                toast.show();
            });
    }
}
