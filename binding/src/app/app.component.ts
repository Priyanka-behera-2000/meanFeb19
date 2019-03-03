import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //property to receive input
 data={num1:'',num2:''};
 //property to store result
 sum=0;
//property to control the display of result div
flag=true;

//object to receive the referece of input form
@ViewChild("adderForm")
frm:FormGroup;
//Method to calculate the sum
public add()
{
  //check whether the form is valid or not
  if(this.frm.invalid)
  {
    //input elements of the form are marked as touched.
    for(let i in this.frm.controls)
    this.frm.controls[i].markAsTouched();
  }
  else
  {
  //value of flag is set to false so that result div is displayed
  this.flag=false;
  this.sum=parseInt(this.data.num1)+parseInt(this.data.num2);
  }
}
}
