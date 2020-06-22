import { ActionDialogService } from "../services/action-dialog.service";

export class BaseComponent {
    constructor(private actionDialogService: ActionDialogService) {}

    displayActionDialog() {
        this.actionDialogService.displayActionDialog();
    }
}
