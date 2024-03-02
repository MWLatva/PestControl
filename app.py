import json
from flask import Flask, jsonify, request, render_template
# from flask_restful import Api, Resource
from flask_restx import Api, reqparse, Resource
from flask_swagger import swagger as Swagger
from flask_swagger_ui import get_swaggerui_blueprint
from geopy.distance import geodesic

parser = reqparse.RequestParser()
parser.add_argument('lat', type=float, help='Latitude of the location')
parser.add_argument('lng', type=float, help='Longitude of the location')
parser.add_argument('radius', type=float, help='Radius in miles')

app = Flask(__name__)
api = Api(app)

# Load JSON data from a separate file
with open('store.json', 'r') as file:
    stores = json.load(file)
with open('prescription.json', 'r') as file:
    prescriptions = json.load(file)

@api.route('/index')
class Index(Resource):
    def get(self):
        return render_template('index.html')

# Find stores within a given radius from target latitude and longitude (typically client's current location).
def find_stores_within_radius(target_lat, target_lng, radius=25):
    nearby_stores = []
    target_location = (target_lat, target_lng)
    for store in stores["stores"]:
        store_location = (store["lat"], store["lng"])
        distance = geodesic(store_location, target_location).miles
        if distance <= radius:
            store["distance"] = distance
            nearby_stores.append(store)
    return nearby_stores

# Find the prescription prices across providers
def find_prescription_price(prescription_name):
    for prescription in prescriptions["Prescriptions"]:
        if prescription["name"] == prescription_name:
            return prescription["locations"]
    return []

# Flask endpoint to search prescription with ZIP code
@api.route('/search_prescription/<prescription>')
class SearchPrescription(Resource):

    @api.expect(parser)
    def get(self, prescription):
        # Get ZIP code from the request parameters
        # prescription = {'name': 'Paracetamol', 'ZIP': 18015, 'Provider': 'Walgreens', 'Price': 10.00}
        #prescription_name = request.args.get('prescription')

        args = parser.parse_args()
        lat = args['lat']
        lng = args['lng']
        radius = args['radius']
        
        if(lat is None or lng is None):
            # return preset lat or long
            lat = 40.6012728
            lng = -75.3598203

        if(radius is None):
            radius = 25

        nearby_stores = find_stores_within_radius(lat, lng, radius)
        prescription_prices = find_prescription_price(prescription)

        results = []
        for store in nearby_stores:
            for price_info in prescription_prices:
                if price_info["providerid"] == store["id"]:
                    results.append({
                        "store_name": store["name"],
                        "lat": store["lat"],
                        "lng": store["lng"],
                        "price": price_info["price"],
                        "distance": store["distance"],
                    })

        return jsonify(results)


