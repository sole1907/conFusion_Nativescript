import { Injectable } from "@angular/core";
import { CouchbaseService } from "./couchbase.service";

@Injectable()
export class ReservationService {
    reservations: Array<string>;
    docId: string = "reservations";

    constructor(private couchbaseService: CouchbaseService) {
        this.reservations = [];

        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null) {
            this.couchbaseService.createDocument(
                { reservations: [] },
                this.docId
            );
        } else {
            this.reservations = doc.reservations;
        }
    }

    addReservation(reservation: string): boolean {
        this.reservations.push(reservation);
        this.couchbaseService.updateDocument(this.docId, {
            reservations: this.reservations,
        });

        return true;
    }
}
