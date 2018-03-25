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

constructor(public dataService: DataService, private router: Router) {
  const user = this.getStorageItems();
  if (user.status === false) {
    this.router.navigate(['/login']);
  }
}

errors: any;
isDataLoaded: Boolean = false;
loggedIn: Boolean = false;
queryString: String = '';
antiques: Array<any> = [];

ngOnInit() {
  this.getAllAntiques();
}

public addNewAntique() {
  this.router.navigate(['/newAntique']);
}

public getAllAntiques() {
  this.dataService.getAllAntiques().subscribe(response => {
      this.antiques = response.data;
      console.log(this.antiques);
    },
    error => {
      this.errors = error;
      console.log(error);
      this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
    });
}

public editItem(itemId) {
  this.dataService.selectedItemId = itemId;
  this.router.navigate(['/editAntique']);
}

public sortByWordLength = (a: any) => {
  return a.name.length;
}


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
