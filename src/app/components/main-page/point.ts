export class Point{
    latitude: number;
    longitude: number;
    object: string;
    description: string;
    userId: number;
    constructor(latitude, longitude, object, description, userId) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.longitude = longitude;
        this.object = object;
        this.description = description;
        this.userId = userId;
    }
}