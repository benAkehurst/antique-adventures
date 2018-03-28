import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-antique',
    templateUrl: './editAntique.component.html',
    styleUrls: ['./editAntique.component.css']
})

export class EditAntiqueComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router, private storage: AngularFireStorage) { }

    errors: any;
    isDataLoaded: Boolean = false;
    loggedIn: Boolean = false;
    radioValue = { valueSigned: true, valueNotSigned: false };
    orderbydescending = true;
    itemId: String = '';
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
        this.getItemId();
        this.populateForm();
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

    public populateForm() {
        this.dataService.getAntique(this.itemId).subscribe(res => {
            this.dataService.Antique.name = res.data.name;
            this.dataService.Antique.artist = res.data.artist;
            this.dataService.Antique.year = res.data.year;
            this.dataService.Antique.category = res.data.category;
            this.dataService.Antique.subCategory = res.data.subCategory;
            this.dataService.Antique.signed = res.data.signed;
            this.dataService.Antique.value = res.data.value;
            this.dataService.Antique.description = res.data.description;
            this.dataService.Antique.condition = res.data.condition;
            this.dataService.Antique.width = res.data.width;
            this.dataService.Antique.height = res.data.height;
            this.dataService.Antique.depth = res.data.depth;
            this.dataService.Antique.material = res.data.material;
            this.dataService.Antique.location = res.data.location;
            this.dataService.Antique.provenance = res.data.provenance;
            this.dataService.Antique.status = res.data.status;
            this.dataService.Antique.image = res.data.image;
            this.dataService.Antique.provenanceImage = res.data.provenanceImage;
        });
    }

    public editAntique() {
        // console.log('route saved');
        this.dataService.editAntique(this.itemValue).subscribe(response => {
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
