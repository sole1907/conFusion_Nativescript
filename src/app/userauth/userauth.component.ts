import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { getString, setString } from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as imagepicker from "nativescript-imagepicker";

@Component({
    moduleId: module.id,
    templateUrl: "./userauth.component.html",
})
export class UserAuthComponent implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    tabSelectedIndex: number = 0;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
            userName: [getString("userName", ""), Validators.required],
            password: [getString("password", ""), Validators.required],
        });

        this.registerForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            userName: ["", Validators.required],
            password: ["", Validators.required],
            telnum: ["", Validators.required],
            email: ["", Validators.required],
        });
    }

    ngOnInit() {}

    takePicture() {
        let isAvailable = camera.isAvailable();
        if (isAvailable) {
            camera.requestPermissions();
            var options = {
                width: 100,
                height: 100,
                keepAspectRatio: false,
                saveToGallery: true,
            };

            camera
                .takePicture(options)
                .then((imageAsset) => {
                    let image = <Image>(
                        this.page.getViewById<Image>("myPicture")
                    );
                    image.src = imageAsset;
                })
                .catch((err) => console.log("Error -> " + err.message));
        } else {
            console.log("Camera not available");
        }
    }

    selectImage() {
        const page = this.page;
        let context = imagepicker.create({
            mode: "single", // use "multiple" for multiple selection
        });
        context
            .authorize()
            .then(function () {
                return context.present();
            })
            .then(function (selection) {
                selection.forEach(function (selected) {
                    // process the selected image
                    let image = <Image>page.getViewById<Image>("myPicture");
                    image.src = selected;
                });
            })
            .catch(function (e) {
                // process error
                console.log("unable to select image, error: ", e);
            });
    }

    register() {
        this.tabSelectedIndex = 1;
    }

    onLoginSubmit() {
        console.log(JSON.stringify(this.loginForm.value));

        setString("userName", this.loginForm.get("userName").value);
        setString("password", this.loginForm.get("password").value);

        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

    onRegisterSubmit() {
        console.log(JSON.stringify(this.registerForm.value));

        setString("userName", this.registerForm.get("userName").value);
        setString("password", this.registerForm.get("password").value);

        this.loginForm.patchValue({
            userName: this.registerForm.get("userName").value,
            password: this.registerForm.get("password").value,
        });

        this.tabSelectedIndex = 0;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
