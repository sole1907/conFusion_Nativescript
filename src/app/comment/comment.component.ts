import {
    Component,
    OnInit,
    Inject,
    ChangeDetectorRef,
    ViewContainerRef,
} from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Slider } from "tns-core-modules/ui/slider";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "app-comment",
    moduleId: module.id,
    templateUrl: "./comment.component.html",
})
export class CommentComponent implements OnInit {
    comment: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private params: ModalDialogParams
    ) {
        this.comment = this.formBuilder.group({
            rating: 5,
            author: ["", Validators.required],
            comment: ["", Validators.required],
        });
    }

    ngOnInit() {}

    onAuthorChange(args) {
        let textField = <TextField>args.object;

        this.comment.patchValue({ author: textField.text });
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;

        this.comment.patchValue({ comment: textField.text });
    }

    onSliderRatingChange(args) {
        let slider = <Slider>args.object;

        this.comment.patchValue({ rating: Math.round(slider.value) });
    }

    onSubmit() {
        this.comment.patchValue({ date: new Date().toISOString() });
        console.log(JSON.stringify(this.comment.value));
        this.params.closeCallback(this.comment.value);
    }
}
