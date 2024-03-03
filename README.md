# PestControl - Rx-4Less
Project is part of LehighHacks Hack for Health 2024, the second annual Lehigh University hackathon, sponsored by Google Cloud. The theme of this year's competition was to design an impactful, healthcare-based software solution to contemporary problems.<br>

After significant discussion, we decided upon addressing the issue of expensive and (often) unaffordable medication. Regardless of an individuals gender and age, quality of insurance, or general socioeconomic background, everybody stands to face this problem at some point in time. <br>

This situation only gets worse for those who have poor insurance, must use expensive life-saving drugs (e.g. Chemotherapy medicine), or for those who simply are unaware that they may be being taken advantage of. <br>

Unfortunately, you heard that right. Oftentimes, the majority of these expensive-retail drugs sell at ridiculous markups. This is partially due to the setup of the commercial pharmaceutical industry at large; retail pharmacies like Walgreens and CVS are forced to sell to _you_ at exorbitant prices, by PBMs (Pharmacy Benefit Managers) who serve major drug manufacturers. With this being said, there are alternative Rx options to still be able to afford living. This was our motivation for Rx-4Less.

Rx-4Less is meant to be a tool to help people find affordable medication, harnessing the power of Google APIs and a heavily-modularized tech stack. A user can begin by entering a zip code to search near them. They can then select the name of the medication they are looking for. The map will be updated with custom, detail-packed pins as our application finds a number of pharmacies within a certain mile radius of your entered address, who have your correct prescription. Finally, a user can price search and compare prices across many pharmacies; they can also 'add' medications to their profile and see a 'List'/'Map' view for ease of User Experience.

We are very excited to present our project, Rx-4Less, at the judging session on Sunday, March 3rd 2024. Thank you for reading and we hope you enjoy the project.<br><br>

Team Pest Control:
Paolo Bartolucci, CSE '24
Joseph Bereswill, CSB '24
Mark Latvakoski, CSE '25
Micah Worth, CSE '24


# Run Instructions (Angular App):
 * Make sure you are in the directory PestControl / RxPicker / src
 * To run:
    ng serve

# Architecture / Stack:
Backend: Flask (Python)
Frontend: Angular (Typescript)
<br>

# APIs:
Google Map API 
Google Geodistance
Flask RestX
<br>

# Packages & Assets:
PrimeNG (Angular Templates)
Geopy (Geodesic)
SVG Repo (Logo Design)
<br>

==========================================================
(DEPRECATED - Flask Run Instructions)
To run:

flask --app app run
 * Serving Flask app 'app'
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
==========================================================

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