import { Component, OnInit } from '@angular/core';
import { ApiprovinceService} from '../../services/apiprovince.service';
import { DialogDeleteComponent } from '../../common/delete/dialogdelete.component';
import { MatDialog } from '@angular/material/dialog';
import { Province } from '../../models/province';
import { ProvinceFormComponent } from '../../province/province-form/province-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {

  public lstProvinces: any[];
  public columnas: string[]= ['name', 'abbrevation', 'actions'];
  public countryId : number;
  readonly width: string = '600px';

  constructor(
    private _api: ApiprovinceService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(p => {
      this.countryId = p.id;
    });
    this.getProvinces();
  }

  getProvinces(){
    this._api.getProvinces(this.countryId).subscribe(res =>{
      this.lstProvinces= res.data;
    })
  }

  openAdd(){
    const dialogRef = this._dialog.open(ProvinceFormComponent, {
      width:this.width,
      data:{
        countyId: this.countryId,
        id: 0,
        name: '',
        abbrevation: ''
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getProvinces();
    }) 
  }

  openEdit(province: Province){
    const dialogRef = this._dialog.open(ProvinceFormComponent, {
      width:this.width,
      data:{
        countyId: this.countryId,
        id: province.id,
        name: province.name,
        abbrevation: province.abbrevation
      }
      //data:province
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getProvinces();
    }) 
  }

  
  delete(province : Province ){
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      width:this.width
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this._api.delete(province.id).subscribe(response =>{
          if (response.data != undefined){
                this._snackBar.open('Province eliminado con exito','',{
                  duration:5000
                })
                this.getProvinces();
          }
        });
      }
    }) 
  }

}
