import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PointObject} from "./point-object";
import * as DG from '2gis-maps';
import {HttpService} from '../../http.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.css'],
    providers: [HttpService]
})
export class MainPageComponent implements OnInit {
    pointForm: FormGroup;
    pointFormShow: FormGroup;
    pointObject: PointObject = new PointObject();
    map: any;
    latitudeMy: number = 46.4085469;  // I live here
    longitudeMy: number = 30.73150629; // I live here
    latitude: number;
    longitude: number;
    isShowForm: boolean = false;
    myLocation: any;
    arrayMarkers: any = [];
    objects = ["Pharmacy", "Gas Station", "School", "Restaurant"];

    constructor(private fb: FormBuilder,
                private httpService: HttpService) {
    }

    ngOnInit() {
        this.map = DG.map('map', {
            center: [this.latitudeMy, this.longitudeMy],
            zoom: 14,
            closePopupOnClick: false,
            worldCopyJump: true,
            zoomControl: true,
            fullscreenControl: false,
            geoclicker: false

        });
        this.map.addControl(DG.control.ruler());
        DG.control.location({position: 'topleft'}).addTo(this.map);

        let popupYourLocation = "Hello!<br> I live here.";
        this.myLocation = DG.marker([this.latitudeMy, this.longitudeMy]).addTo(this.map).bindPopup(popupYourLocation).openPopup();

        this.map.on('click', (e) => {
            let newPopUp = "Fill description";

            DG.marker(e.latlng).addTo(this.map).bindPopup(newPopUp).openPopup();
            this.isShowForm = true;
            this.latitude = e.latlng.lat;
            this.longitude = e.latlng.lng;
        });
        this.buildForm();
    }

    buildForm() {
        this.pointForm = this.fb.group({
            "object": [this.pointObject.object],
            "description": [this.pointObject.description]
        });

        this.pointFormShow = this.fb.group({
            "object": [this.pointObject.object]
        });
    }

    zoomIn() {
        this.map.zoomIn(1);
    }

    zoomOut() {
        this.map.zoomOut(1);
    }

    onValueChange(data?: any) {
    }

    onPointsShow() {
        var i = 0;
        this.httpService.getPoints(this.pointFormShow.value.object)
            .subscribe(
                points => {
                    console.log(points);
                    this.myLocation.remove(); // Delete My Marker
                    if (this.arrayMarkers) {

                        console.log(this.arrayMarkers); // Delete Old Markers
                        for (let j in this.arrayMarkers) {
                            this.arrayMarkers[j].remove();
                        }
                    }
                    for (let point in points) {
                        i++;
                        var newDescription = "<h4>" + points[point].object + "</h4>" + points[point].description;
                        this.arrayMarkers[i] = DG.marker([points[point].latitude, points[point].longitude]).addTo(this.map).bindPopup(newDescription).openPopup();
                    }
                }
            );
    }

    onSubmit() {
        this.pointForm.value.latitude = this.latitude;
        this.pointForm.value.longitude = this.longitude;
        this.httpService.addPoint(this.pointForm.value)
            .subscribe(
                res => {
                    this.isShowForm = false;
                    this.showMarkerDeskription(res.latitude, res.longitude);
                }
            );
    }

    showMarkerDeskription(latitude: number, longitude: number) {
        this.httpService.getPoint(latitude, longitude)
            .subscribe(
                point => {
                    console.log(point);
                    let newDescription = "<h4>" + point.object + "</h4>" + point.description;
                    DG.marker([latitude, longitude]).addTo(this.map).bindPopup(newDescription).openPopup();
                }
            );
    }

}