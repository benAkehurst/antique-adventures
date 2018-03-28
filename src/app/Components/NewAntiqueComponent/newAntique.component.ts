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
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-new-antique',
    templateUrl: './newAntique.component.html',
    styleUrls: ['./newAntique.component.css']
})

export class NewAntiqueComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router, private storage: AngularFireStorage) { }

    errors: any;
    isDataLoaded: Boolean = false;
    loggedIn: Boolean = false;
    radioValue = { valueSigned: true, valueNotSigned: false };
    orderbydescending = true;
    selectedImageFile = null;
    selectedProvenanceFile = null;
    toUpload = null;
    uploadPercent: Observable<number>;
    uploadPercentProv: Observable<number>;
    imageUrl: Observable<string | null>;
    provenanceImageUrl: Observable<string | null>;
    itemValue = {
        value: '',
        date: ''
    };
    categories = [
        { id: 1, category: 'Paintings / Prints' },
        { id: 2, category: 'Glass' },
        { id: 3, category: 'Bronze' },
        { id: 4, category: 'Ceramics' },
        { id: 5, category: 'Jewellery' },
        { id: 6, category: 'Philatelic' },
        { id: 7, category: 'Numismatic' },
    ];

    ngOnInit() {
    }

    public onImageFileSelected(event) {
        this.selectedImageFile = event.target.files[0];
    }

    public onProvenanceFileSelected(event) {
        this.selectedProvenanceFile = event.target.files[0];
    }

    public uploadFile() {
        const file = this.selectedImageFile;
        const filePath = 'antique_images/' + this.selectedImageFile.name;
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        this.imageUrl = task.downloadURL();
        this.imageUrl.subscribe(value => {
            this.dataService.Antique.image = value;
        });
    }

    public uploadProvenanceFile() {
        const file = this.selectedProvenanceFile;
        const filePath = 'antique_images/' + this.selectedProvenanceFile.name;
        const task = this.storage.upload(filePath, file);
        this.uploadPercentProv = task.percentageChanges();
        this.provenanceImageUrl = task.downloadURL();
        this.provenanceImageUrl.subscribe(value => {
            this.dataService.Antique.provenanceImage = value;
        });
    }

    public backToHome() {
        this.router.navigate(['/home']);
    }

    public saveAntique() {
        this.dataService.saveAntique(this.itemValue).subscribe(response => {
            // console.log(response);
            this.openSwal('Success', 'Your New Antique was saved!');
            this.dataService.Antique.name = '';
            this.dataService.Antique.artist = '';
            this.dataService.Antique.year = '';
            this.dataService.Antique.category = '';
            this.dataService.Antique.subCategory = '';
            this.dataService.Antique.signed = '';
            this.dataService.Antique.boughtPrice = '';
            this.dataService.Antique.soldPrice = '';
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
