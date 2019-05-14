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
  MatPaginatorModule
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
  MatPaginatorModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
