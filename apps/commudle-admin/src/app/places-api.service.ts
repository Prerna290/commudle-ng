// import { Injectable } from '@angular/core';

// // declare global {
// //   interface Google {
// //     // map: google.maps.Map;
// //     map: any;
// //     service: any;
// //     infowindow: any;
// //   }
// // }

// declare global {
//   interface google {}
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class PlacesApiService {
//   //  google: any;
//   constructor(
//     private map: google.maps.Map,
//     private service: google.maps.places.PlacesService,
//     private infowindow: google.maps.InfoWindow,
//   ) {}

//   google: any;

//   initMap(): void {
//     const sydney = new google.maps.LatLng(-33.867, 151.195);
//     this.infowindow = new google.maps.InfoWindow();
//     this.map = new google.maps.Map(document.getElementById('map'), { center: sydney, zoom: 15 });
//     const request: google.maps.places.FindPlaceFromQueryRequest = {
//       query: 'Museum of Contemporary Art Australia',
//       fields: ['name', 'geometry'],
//     };
//     this.service = new google.maps.places.PlacesService(map);
//     service.findPlaceFromQuery(
//       request,
//       (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           for (let i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//           }
//           this.map.setCenter(results[0].geometry!.location);
//         }
//       },
//     );
//   }
// }

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Service {
//   private placesService: google.maps.places.PlacesService;

//   constructor() {
//     const map = new google.maps.Map(document.getElementById('map')!, {
//       center: { lat: -33.867, lng: 151.195 },
//       zoom: 15,
//     });

//     this.placesService = new google.maps.places.PlacesService(map);
//   }

//   searchPlaces(
//     query: string,
//     callback: (
//       results: google.maps.places.PlaceResult[] | null,
//       status: google.maps.places.PlacesServiceStatus,
//     ) => void,
//   ) {
//     const request = {
//       query: query,
//       fields: ['name', 'geometry'],
//     };

//     this.placesService.findPlaceFromQuery(request, callback);
//   }
// }
