import { MedLocation } from "./medLocation.model";

export type Prescription = {
    name:string;
    price:number;
    location?: MedLocation;
}


export const DEFAULT_PRESCRIPTION:Prescription ={
    name:"",
    price:0.0,
    location:undefined
}