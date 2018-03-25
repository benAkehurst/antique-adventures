import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';

@Component({
    selector: 'app-edit-antique',
    templateUrl: './editAntique.component.html',
    styleUrls: ['./editAntique.component.css']
})

export class EditAntiqueComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    errors: any;
    isDataLoaded: Boolean = false;
    loggedIn: Boolean = false;
    radioValue = { valueSigned: true, valueNotSigned: false };
    orderbydescending = true;
    itemId: String = '';

    ngOnInit() {
        this.getItemId();
        this.populateForm();
    }

    public populateForm() {
        this.dataService.getAntique(this.itemId).subscribe(res => {
            this.dataService.Antique.name = res.data.name;
            this.dataService.Antique.artist = res.data.artist;
            this.dataService.Antique.year = res.data.year;
            this.dataService.Antique.category = res.data.category;
            this.dataService.Antique.signed = res.data.signed;
            this.dataService.Antique.value = res.data.value;
            this.dataService.Antique.image = res.data.image;
            this.dataService.Antique.description = res.data.description;
            this.dataService.Antique.condition = res.data.condition;
            this.dataService.Antique.width = res.data.width;
            this.dataService.Antique.height = res.data.height;
            this.dataService.Antique.depth = res.data.depth;
            this.dataService.Antique.material = res.data.material;
            this.dataService.Antique.location = res.data.location;
            this.dataService.Antique.provenance = res.data.provenance;
            this.dataService.Antique.provenanceImage = res.data.provenanceImage;
            this.dataService.Antique.status = res.data.status;
        });
    }

    public editAntique() {
        // console.log('route saved');
        this.dataService.editAntique().subscribe(response => {
            console.log(response);
            this.openSwal('Success', 'Your New Antique was updated!');
        },
        error => {
            this.errors = error;
            this.openSwal('Error', 'Sorry, we couldn\'t save right now');
        });
    }

    public getItemId() {
        this.itemId = this.dataService.selectedItemId;
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
