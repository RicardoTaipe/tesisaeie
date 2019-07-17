import { NgModule } from "@angular/core";
import {
  MatExpansionModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatMenuModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule
} from "@angular/material";

const MaterialComponents = [
  MatExpansionModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatMenuModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
