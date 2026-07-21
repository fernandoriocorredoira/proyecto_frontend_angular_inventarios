import { Component, inject, model } from "@angular/core";
import { CategoriaInterface } from "../../../../core/interfaces/CategoriaInterface";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-categoria-dialog',
    templateUrl: 'categoria-dialog.html',
    styleUrls: ['./categoria-dialog.scss'],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ]
})
export class CategoriaDialog{
    readonly dialogRef = inject(MatDialogRef<CategoriaDialog>);

    readonly data = inject<CategoriaInterface>(MAT_DIALOG_DATA);
    readonly dataCategoria = model(this.data);

    onNoClick(): void {
        this.dialogRef.close();
    }
}