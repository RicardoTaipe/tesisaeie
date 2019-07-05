import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { Ads } from "src/app/model/ads";
import { AdsService } from "src/app/services/ads.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.css"]
})
export class AdsComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly ANUNCIOS_REGISTRADOS = 0;
  readonly REGISTRAR_ANUNCIOS = 1;
  ads: Ads = new Ads();
  displayedColumns: string[] = [
    "title",
    "description",
    "Actualizar",
    "Eliminar"
  ];
  dataSource = new MatTableDataSource<Ads>();

  constructor(private adsService: AdsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAnuncios();
  }

  saveAds(adsForm: NgForm) {
    console.log(adsForm.value);
    if (adsForm.form.valid) {
      if (adsForm.value._id == null) {
        this.adsService.addAds(adsForm.value).subscribe(data => {
          this.getAnuncios();
          this.showMessage(data);
          this.resetForm(adsForm);
          this.tabGroup.selectedIndex = this.ANUNCIOS_REGISTRADOS;
        });
      } else {
        this.adsService
          .updateAds(adsForm.value._id, adsForm.value)
          .subscribe(data => {
            console.log(data);
            this.showMessage(data);
            this.getAnuncios();
            this.resetForm(adsForm);
            this.tabGroup.selectedIndex = this.ANUNCIOS_REGISTRADOS;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAnuncios() {
    this.adsService.getAds().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.ANUNCIOS_REGISTRADOS;
      console.log(res);
    });
  }

  updateAds(adsSelected: Ads) {
    console.log(adsSelected);
    this.ads = Object.assign({}, adsSelected);
    this.tabGroup.selectedIndex = this.REGISTRAR_ANUNCIOS;
  }
  deleteAds(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.adsService.deleteAds(_id).subscribe(res => {
        this.showMessage(res);
        this.getAnuncios();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.ads = new Ads();
    this.tabGroup.selectedIndex = this.ANUNCIOS_REGISTRADOS;
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
