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
    selector: 'app-new-antique',
    templateUrl: './newAntique.component.html',
    styleUrls: ['./newAntique.component.css']
})

export class NewAntiqueComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    errors: any;
    isDataLoaded: Boolean = false;
    loggedIn: Boolean = false;
    radioValue = { valueSigned: true, valueNotSigned: false };
    orderbydescending = true;

    ngOnInit() {
    }

    public backToHome() {
        this.router.navigate(['/home']);
    }

    public saveAntique() {
        // console.log('route saved');
        this.dataService.saveAntique().subscribe(response => {
            // console.log(response);
            this.openSwal('Success', 'Your New Antique was saved!');
            this.dataService.Antique.name = '';
            this.dataService.Antique.artist = '';
            this.dataService.Antique.year = '';
            this.dataService.Antique.category = '';
            this.dataService.Antique.signed = '';
            this.dataService.Antique.value = '';
            this.dataService.Antique.image = '';
            this.dataService.Antique.description = '';
            this.dataService.Antique.condition = '';
            this.dataService.Antique.width = '';
            this.dataService.Antique.height = '';
            this.dataService.Antique.depth = '';
            this.dataService.Antique.material = '';
            this.dataService.Antique.location = '';
            this.dataService.Antique.provenance = '';
            this.dataService.Antique.provenanceImage = '';
            this.dataService.Antique.status = '';
        },
        error => {
            this.errors = error;
            this.openSwal('Error', 'Sorry, we couldn\'t save right now');
        });
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
