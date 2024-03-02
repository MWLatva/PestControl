# PestControl 
To run:

flask --app app run
 * Serving Flask app 'app'
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)

Architecture / Stack:
Backend: Flask (Python)


APIs:
Google Map
Google Distance Matrix?
Google Cloud Platform?


### Functionality of API:
* Return list of internal data
  * List all prescriptions
    * For each prescription:
      * List available locations
      * List prices for each location
  * List all locations
  * List avalible filters for location
* apply filters to data
  * For each list of prescriptions
    * Apply filter or sort to list
      * Filters include:
        * By store
        * By dosage
      * Sort options include
        * By price
        * By distance


## Routes

### Prescriptions
GET `search_prescription/?zip=[]&prescription=[]`
```json
{
    "prescription":[
        {
            "locations":[
                {
                    "provider":
                    {
                        "id":1,
                        "name":"name",
                        "lat":40.000,
                        "lng":-75.000,
                        "zipcode":"18017"
                    },
                    "price":1.0
                },
                {
                    "provider":
                    {
                        "id":2,
                        "name":"name",
                        "lat":40.000,
                        "lng":-75.000,
                        "zipcode":"18015"
                    },
                    "price":2.0
                }
            ]
        }
    ]
}
```



### Locations
GET `locations/`

```json
{
    "locations":[
        {
            "id":1,
            "name":"Walgreens",
            "lat":40.64400252810672,
            "lng":-75.39853173223706,
            "zipcode":"18017"
        },
        {
            "id":2,
            "name":"CVS",
            "lat":40.619752799536336,
            "lng":-75.38131720709013,
            "zipcode":"18015"
        },
        ...
    ]
}

```

### 