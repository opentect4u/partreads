import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pluck } from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';

@Component({
selector: 'dialogForbjAppRej-component',
templateUrl: './dialogForbjAppRej.component.html',
styleUrls: ['./dialogForbjAppRej.component.css']
})
export class DialogforbjapprejComponent implements OnInit {

 __rejectBk= new FormGroup({
    remarks: new FormControl('',this.data.mode == 'R' ? [Validators.required] : [])
 })

constructor(
    private __dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogforbjapprejComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private __utility: UtilityTService
) {
}

ngOnInit(){

}
changeStatus(){
    const __fb = new FormData();
    __fb.append('id',this.data.id);
    __fb.append('temp_book_id',this.data.temp_book_id);
    __fb.append('show_book',this.data.show_book);
    if(this.data.mode == 'R'){
        __fb.append('reject_msg',this.__rejectBk.value.remarks);
    }
    this.__utility.api_call(1,this.data.api_name,__fb).pipe(pluck("success")).subscribe(res =>{
          this.dialogRef.close(1);
    })
}
}