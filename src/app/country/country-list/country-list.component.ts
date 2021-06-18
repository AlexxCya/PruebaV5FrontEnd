import { Component, OnInit } from '@angular/core';
import { ApicountryService} from '../../services/apicountry.service';
import { DialogDeleteComponent } from '../../common/delete/dialogdelete.component';
import { MatDialog } from '@angular/material/dialog';
import { Country } from '../../models/country';
import { CountryFormComponent } from '../../country/country-form/country-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  public lstCountries: any[];
  public columnas: string[]= ['name', 'alpha2Code', 'alpha3Code','code', 'iso', 'independent', 'actions'];
  readonly width: string = '600px';

  constructor(
    private _api: ApicountryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 

  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this._api.getCountries().subscribe(res =>{
      this.lstCountries= res.data;
    })
  }

  openAdd(){
    const dialogRef = this._dialog.open(CountryFormComponent, {
      width:this.width
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getCountries();
    }) 
  }

  openEdit(country: Country){
    const dialogRef = this._dialog.open(CountryFormComponent, {
      width:this.width,
      data:country
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getCountries();
    }) 
  }

  
  delete(country : Country ){
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      width:this.width
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this._api.delete(country.id).subscribe(response =>{
          if (response.data != undefined){
                this._snackBar.open('Country eliminado con exito','',{
                  duration:5000
                })
                this.getCountries();
          }
        });
      }
    }) 
  }

}
