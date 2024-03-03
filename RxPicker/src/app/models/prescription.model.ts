import { MedLocation } from "./medLocation.model";

export type Prescription = {
    name:string;
    price:number;
    location?: MedLocation;
}