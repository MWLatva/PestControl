export type MedLocation = {
    address:string;
    distance:number;
    lat:number;
    lng:number;
    name:string;
    store_name:string;
    price:number;
}

export const DEFAULT_MEDLOCATION:MedLocation = {
    address:"",
    distance:0.0,
    lat:0.0,
    lng:0.0,
    name:"",
    store_name:"",
    price:0.0

}