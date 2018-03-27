import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import { MatPaginatorModule } from '@angular/material/paginator';

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
p: Number = 1;

ngOnInit() {
  this.getAllAntiques();
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

public goToAntiquePage(itemId) {
  this.dataService.selectedItemId = itemId;
  this.router.navigate(['/viewAntique']);
}

public addNewAntique() {
  this.router.navigate(['/newAntique']);
}

public editItem(itemId) {
  this.dataService.selectedItemId = itemId;
  this.router.navigate(['/editAntique']);
}

public deleteItem(itemId) {

}

public downloadDatabaseAsXls() {
  this.dataService.downloadDatabase().subscribe(res => {
    console.log(res);
    const blob = new Blob([res.dowload], { type: 'text/xls' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    console.log('DB downloaded');
  });
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
