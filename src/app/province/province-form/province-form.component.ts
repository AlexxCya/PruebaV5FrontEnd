import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiprovinceService } from 'src/app/services/apiprovince.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Province } from 'src/app/models/province';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.scss']
})
export class ProvinceFormComponent implements OnInit {
  public _obj :Province;

  constructor(
    public dialogRef: MatDialogRef<ProvinceFormComponent>,
    public api: ApiprovinceService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public province: Province
  ) {
      if (this.province.id > 0){
          this.provinceForm.patchValue(this.province);
        }
    console.log('obj',this.province);
    console.log('countryId',this.province.countyId);
  }
  ;
  public provinceForm = this.fb.group(
    {
      name: ['',{ validators: [Validators.required, Validators.maxLength(150)]}],
      abbrevation:['',{ validators: [Validators.required, Validators.maxLength(5)]}],

    }
  );

  ngOnInit(): void {
  }
  add(){
    
    // this._obj.countyId = this.province.countyId;
    // this._obj.name = this.provinceForm.value.name;
    // this._obj.abbrevation = this.provinceForm.value.abbrevation;

    this.api.add(this.provinceForm.value,this.province.countyId).subscribe(res =>{
        if (res.data !== undefined){
            this.dialogRef.close();
            this.snackBar.open("province Insertado con Exito", '',{
              duration: 5000
            });
        }
    })
  }

  edit(){
    this.api.edit(this.provinceForm.value, this.province.id, this.province.countyId).subscribe(res =>{
      if (res.data !== undefined){
            this.dialogRef.close();
            this.snackBar.open("province Editado con Exito", '',{
              duration: 5000
            });
        }
    })
}
  close(){
    this.dialogRef.close();
  }

  getErrorByField(){
      var name = this.provinceForm.get('name');
      if (name.hasError('required')){
        return 'required';
      }
      if (name.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
      var abbrevation = this.provinceForm.get('abbrevation');
      if (abbrevation.hasError('required')){
        return 'required';
      }
      if (abbrevation.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
  }


}


