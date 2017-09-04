import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "./components/authorization/user";
import {Point} from "./components/main-page/point";

@Injectable()
export class HttpService {
    private url = "http://localhost:8000/users";
    private urlPoint = "http://localhost:8000/points";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public getUsers(): Observable<User[]> {
        let users = this.http.get(this.url)
            .map(this.extractProducts) // All Users
            .catch(this.handleError);
        return users;
    }

    public getUser(email: string, password: string): Observable<User> {
        let user = this.http.get(this.url + "/" + email + "/" + password)
            .map(this.extractProduct) // User
            .catch(this.handleError);
        return user;
    }

    // Add user
    public addUser(user): Observable<User> {
        return this.http.post(this.url, user, {headers: this.headers})
            .map((response: Response) => {
                let res = response.json();
                if (res == 777) {
                    return "The email is already registred";
                } else {
                    return res;
                }
            })
            .catch(this.handleError);
    }

    // Add point from Map
    public addPoint(point): Observable<Point> {
        return this.http.post(this.urlPoint, point, {headers: this.headers})
            .map((response: Response) => {
                let res = response.json();
                if (res == 777) {
                    return "The email is already registred";
                } else {
                    return res;
                }
            })
            .catch(this.handleError);
    }

    public getPoint(latitude: number, longitude: number): Observable<Point> {
        let point = this.http.get(this.urlPoint + "/" + latitude + "/" + longitude)
            .map(this.extractPoint) //  Point
            .catch(this.handleError);
        return point;
    }

    public getPoints(object: number): Observable<Point> {
        let points = this.http.get(this.urlPoint + "/" + object)
            .map(this.extractPoints) //  Points
            .catch(this.handleError);
        return points;
    }

    private extractProducts(response: Response) {
        let res = response.json();
        let users: User[] = [];
        for (let i = 0; i < res.length; i++) {
            users.push(new User(res[i].email, res[i].password, res[i].userId));
        }
        return users;
    }

    private extractProduct(response: Response) {
        let res = response.json();
        if (res == 555) {
            return "Wrong Email";
        } else if (res == 666) {
            return "Wrong Password";
        } else {
            return new User(res.email, res.password, res.userId);
        }
    }

    private extractPoint(response: Response) {
        let res = response.json();
        if (res == 888) {
            return "Wrong Point";
        } else {
            return new Point(res.latitude, res.longitude, res.object, res.description, res.userId);
        }
    }

    private extractPoints(response: Response) {
        let res = response.json();
        if (res == 888) {
            return "Wrong Point";
        } else {
            return res;
        }
    }

    private handleError(error: any, cought: Observable<any>): any {
        let message = "";
        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        if (message == "Unexpected end of JSON input") {
        }
        return Observable.throw(message);
    }
}