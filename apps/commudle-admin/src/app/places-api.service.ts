// import { Injectable } from '@angular/core';

// declare var google: any;
// @Injectable({
//     providedIn: 'root',
// })
// export class PlacesApiService {
//    map : google.maps.Map;
//    service : google.maps.places.PlacesService;
//     infowindow : google.maps.InfoWindow;

//     constructor() {}

//     initMap(): void {
//         console
//     const sydney = new google.maps.LatLng(-33.867, 151.195);

//     this.infowindow = new google.maps.InfoWindow();

//     this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//     center: sydney,
//     zoom: 15,
//   });

//   const request = {
//     query: "Museum of Contemporary Art Australia",
//     fields: ["name", "geometry"],
//   };
// }

//     // searchForPlaces(input) {
//     //     const request = {
//     //         query: input,
//     //         fields: ['name', 'geometry']
//     //     };
//     // }
//     // const input = 'input';
//     // searchForPlaces(input);

// //     service = new google.maps.places.PlacesService(map);
// //     service.findPlaceFromQuery(request, function(results, status) {
// //     if (status === google.maps.places.PlacesServiceStatus.OK) {
// //       // If the search was successful, create a marker for each result
// //       for (let i = 0; i < results.length; i++) {
// //         createMarker(results[i]);
// //       }
// //     }
// //   });
// }
// }

// // searchForPlaces() {
// //     const input = document.getElementById('search-input');
// //     const autocomplete = new google.maps.places.Autocomplete(input);

// //     autocomplete.addListener('place_changed', () => {
// //       const place = autocomplete.getPlace();
// //       if (place.geometry) {
// //         const request = {
// //           location: place.geometry.location,
// //           radius: 5000,
// //           fields: ['name', 'geometry']
// //         };
// //         const service = new google.maps.places.PlacesService(map);
//         // service.nearbySearch(request, (results, status) => {
//         //   if (status === google.maps.places.PlacesServiceStatus.OK) {
//         //     for (let i = 0; i < results.length; i++) {
//         //       createMarker(results[i]);
//         //     }
//         //   }
//         // });
// //       }
// //     });
// //   }

// console.log(map, service, infowindow);

// const sydney = new google.maps.LatLng(-33.867, 151.195);
// infowindow = new google.maps.InfoWindow();
// map = new google.maps.Map(document.getElementById('map'), { center: sydney, zoom: 15 });
// const request: google.maps.places.FindPlaceFromQueryRequest = {
//   query: 'Museum of Contemporary Art Australia',
//   fields: ['name', 'geometry'],
// };
// service = new google.maps.places.PlacesService(map);
// service.findPlaceFromQuery(
//   request,
//   (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (let i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//       map.setCenter(results[0].geometry!.location);
//     }
//   },
// );

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
