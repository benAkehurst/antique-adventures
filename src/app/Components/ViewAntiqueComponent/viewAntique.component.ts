import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import AntiqueDataModel from '../../DataModels/AntiqueDataModel';

@Component({
    selector: 'app-view-antique',
    templateUrl: './viewAntique.component.html',
    styleUrls: ['./viewAntique.component.css']
})

export class ViewAntiqueComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    errors: any;
    isDataLoaded: Boolean = false;
    loggedIn: Boolean = false;
    itemId: String = '';
    antique: any = [];

    ngOnInit() {
        this.getItemId();
        this.getItemInfo();
    }

    public getItemId() {
        this.itemId = this.dataService.selectedItemId;
    }

    public getItemInfo() {
        this.dataService.getAntique(this.itemId).subscribe(res => {
            this.antique = res.data;
            console.log(this.antique);
        });
    }

    public backToHome() {
        this.router.navigate(['/home']);
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
