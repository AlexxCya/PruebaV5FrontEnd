import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApicountryService } from 'src/app/services/apicountry.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/models/country';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CountryFormComponent>,
    public api: ApicountryService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public country: Country
  ) {
    if (this.country !== null){
      console.log(this.country);
      this.countryForm.patchValue(this.country);
    }
  }
  ;
  public countryForm = this.fb.group(
    {
      name: ['',{ validators: [Validators.required, Validators.maxLength(150)]}],
      alpha2Code:['',{ validators: [Validators.required, Validators.maxLength(2)]}],
      alpha3Code: ['',{ validators: [Validators.required, Validators.maxLength(3)]}],
      code: ['',{ validators: [Validators.required, Validators.maxLength(3)]}],
      iso: ['',{ validators: [Validators.required, Validators.maxLength(14)]}],

    }
  );

  ngOnInit(): void {
  }
  addC(){
    this.api.add(this.countryForm.value).subscribe(res =>{
        if (res.data !== undefined){
            this.dialogRef.close();
            this.snackBar.open("Country Insertado con Exito", '',{
              duration: 5000
            });
        }
    })
  }

  editC(){
    this.api.edit(this.countryForm.value, this.country.id).subscribe(res =>{
      if (res.data !== undefined){
            this.dialogRef.close();
            this.snackBar.open("Country Editado con Exito", '',{
              duration: 5000
            });
        }
    })
}
  close(){
    this.dialogRef.close();
  }

  getErrorByField(){
      var name = this.countryForm.get('name');
      if (name.hasError('required')){
        return 'required';
      }
      if (name.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
      var alpha2Code = this.countryForm.get('alpha2Code');
      if (alpha2Code.hasError('required')){
        return 'required';
      }
      if (alpha2Code.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
      var alpha3Code = this.countryForm.get('alpha3Code');
      if (alpha3Code.hasError('required')){
        return 'required';
      }
      if (alpha3Code.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
      var code = this.countryForm.get('code');
      if (code.hasError('required')){
        return 'required';
      }
      if (code.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  

      var iso = this.countryForm.get('iso');
      if (iso.hasError('required')){
        return 'required';
      }
      if (iso.hasError('maxlength')){
        return 'exceeds the allowed length';  
      }  
  }


}
