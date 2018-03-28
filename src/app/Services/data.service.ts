import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import UserDataModel from '../DataModels/UserDataModel';
import AntiqueDataModel from '../DataModels/AntiqueDataModel';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private localUrl = 'http://localhost:3000/';
  private liveUrl = 'https://antique-adventures.herokuapp.com/';
  User: UserDataModel;
  Antique: AntiqueDataModel;
  selectedItemId: String = '';
  itemImageUrl: String = '';

  constructor(private http: Http) {
    this.User = new UserDataModel();
    this.Antique = new AntiqueDataModel();
  }

  //
  // ─── USER REQUESTS ──────────────────────────────────────────────────────────────
  //
    /**
    * HANDLES REGISTERING A NEW USER
    * @param this.User
    */
    registerUser() {
      return this.http
      .post(this.liveUrl + 'registerUser', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
    }

    /**
    * HANDLES LOGIN FOR A USER
    * @param this.User
    */
    loginUser() {
      return this.http
      .post(this.liveUrl + 'login', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
    }

    getUserProfile() {
      const userId = this.getUserId();
      const dataObj = {
        user: userId
      };
      return this.http
        .post(this.liveUrl + 'getProfile', {data: dataObj}, { headers: this.headers })
        .map(res => res.json());
    }
  //
  // ──────────────────────────────────────────────────────────── USER REQUESTS ─────
  //

  //
  // ─── ANTIQUE REQUESTS ───────────────────────────────────────────────────────────
  //
    getAllAntiques() {
      return this.http
        .post(this.localUrl + 'getAllAntiques', { headers: this.headers })
        .map(res => res.json());
    }

    getAntique(antiqueId) {
      const dataObj = {
        antique: antiqueId
      };
      return this.http
        .post(this.liveUrl + 'getAntique', { data: dataObj }, { headers: this.headers })
        .map(res => res.json());
    }

    saveAntique(itemValObj) {
      const userId = this.getUserId();
      const dataObj = {
        user: userId,
        antique: this.Antique,
        antiqueValue: itemValObj
      };
      return this.http
        .post(this.liveUrl + 'saveNewAntique', { data: dataObj }, { headers: this.headers })
        .map(res => res.json());
    }

  editAntique(itemValObj) {
      const dataObj = {
        antique: this.Antique,
        antiqueValue: itemValObj
      };
      return this.http
        .post(this.liveUrl + 'editAntique/' + this.selectedItemId, { data: dataObj }, { headers: this.headers })
        .map(res => res.json());
    }

    deleteAntique(antiqueId) {
      const userId = this.getUserId();
      const dataObj = {
        user: userId,
        antique: antiqueId
      };
      // console.log(dataObj);
      return this.http
        .post(this.localUrl + 'deleteAntique', { data: dataObj }, { headers: this.headers })
        .map(res => res.json());
    }
  //
  // ───────────────────────────────────────────────────────── ANTIQUE REQUESTS ─────
  //

  public getUserId() {
    const userId = localStorage.getItem('id');
    return userId;
  }
}
