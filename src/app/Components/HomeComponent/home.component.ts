import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

constructor(public dataService: DataService, private router: Router) { }

errors: any;
isDataLoaded: Boolean = false;
loggedIn: Boolean = false;

ngOnInit() {
}

// public getAllPlaces() {
//   this.dataService.getAllPlaces().subscribe(places => {
//       this.places = places.results;
//       // console.log(this.places);
//       this.stripInformationAboutPlace();
//     },
//     error => {
//       this.errors = error;
//       this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
//     });
// }



// public saveRoute() {
//   // console.log('route saved');
//   this.dataService.saveRoute().subscribe(response => {
//     // console.log(response);
//     this.openSwal('Success', 'Your route was saved!');
//   },
//     error => {
//       this.errors = error;
//       this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
//     });
// }


public getStorageItems() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  let userObj = {
    status: false
  };
  if (token == null && id == null) {
    return userObj = {
      status: false
    };
  }
  if (token && id) {
    return userObj = {
      status: true
    };
  }
}

public openSwal(Title, text) {
  swal({
    title: Title,
    text: text,
  });
}

}
