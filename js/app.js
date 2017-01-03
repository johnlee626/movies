 var App = angular.module('App', ['ngRoute', 'ngMaterial', 'ngMessages']);

 App.constant('favorites', []);
 App.constant('tvs', []); 

 App.component('favoriteIcon', {
   bindings: {
     toggle: '=toggle',
     mid: '=mid',
     favorites: '=favorites',
	 tvs: '=tvs',
	 type: '=type'
   },
   template: '<i class="material-icons" ng-click="$ctrl.favorite()">{{ $ctrl.toggle }}</i>{{ $ctrl.mid }}',
   controller: function() {
	 if (this.favorites.indexOf(this.mid) > -1) {
		 this.toggle = "favorite"
	 }
    
     this.favorite = function() { 
		 var index;
            
         if (this.toggle == "favorite") {
             this.toggle = "favorite_border";
			 
			 if (this.type == 'movie') {
				 index = this.favorites.indexOf(this.mid);
				 if (index > -1) {
					 this.favorites.splice(index, 1);
				 }		
			 }
			 else if (this.type == 'tv') {
				 index = this.tvs.indexOf(this.mid);
				 if (index > -1) {
					 this.tvs.splice(index, 1);
				 } 
			 }
			 
             //this.favorites.pop();
             console.log(this.favorites);
         }
         else {
             this.toggle = "favorite";
			 if (this.type == 'movie') {
				this.favorites.push(this.mid);
			 }
			 else if (this.type == 'tv') {
				this.tvs.push(this.mid);             
			 }
			 console.log(this.favorites);
         }
       
     }
    
   }
  
 });
 
 App.component('favoriteIconMain', {
   bindings: {
     toggle: '=toggle',
     mid: '=mid',
     favorites: '=favorites',
	 tvs: '=tvs',
	 list: '=list',
	 tvlist: '=tvlist',
	 type: '=type'
   },
   template: '<i class="material-icons" ng-click="$ctrl.favorite()">delete</i>{{ $ctrl.mid }}',
   controller: function($scope) {
	 if (this.favorites.indexOf(this.mid) > -1) {
		 this.toggle = "favorite"
	 }
    
     this.favorite = function() { 
		 var index;
            
         if (this.toggle == "favorite") {
             this.toggle = "favorite_border";
			 
			 if (this.type == 'movie') {
				 index = this.favorites.indexOf(this.mid);
				 if (index > -1) {
					 this.favorites.splice(index, 1);
				 }			  
				 
			 }
			 else if (this.type == 'tv') {
				 index = this.tvs.indexOf(this.mid);
				 if (index > -1) {
					 this.tvs.splice(index, 1);
				 }
				 				 
			 }
			
			
			//this.list.splice(1);			
			
			
			//$location.path('/favorites.html');
			 
             //this.favorites.pop();
             console.log(this.list);
         }
         else {
             this.toggle = "favorite";
			 
			 if (this.type == 'movie') {
				this.favorites.push(this.mid);
			 }
			 else if (this.type == 'tv') {
				this.tvs.push(this.mid);
			 }             
         }		 
		 
		 $scope.$emit('refresh', this.favorites);
		 $scope.$emit('refreshtv', this.tvs);
		        
     }    
	 
   }
  
 });
 
 App.config(function($httpProvider, $routeProvider, $mdIconProvider) {
     delete $httpProvider.defaults.headers.common['X-Requested-With'];

     $routeProvider
         .when('/', {
             templateUrl: 'pages/home.html'
         })
         .when('/movie/:id', {
             templateUrl: 'pages/movie.html'
         })
         .when('/tv/:id', {
             templateUrl: 'pages/tv.html'
         })
         .when('/actor/:id', {
             templateUrl: 'pages/actor.html'
         })
         .when('/footer', {
             templateUrl: 'pages/footer.html'
         })
		 .when('/favorites', {
             templateUrl: 'pages/favorites.html'
         })
         .otherwise({
             redirectTo: '/'
         });
 });
//  App.config(function($mdThemingProvider) {
//   $mdThemingProvider.definePalette('colorPalette', {
//     '50': 'FFFDE7',
//     '100': 'FFF9C4',
//     '200': 'FFF59D',
//     '300': 'FFF176',
//     '400': 'FFEE58',
//     '500': 'FFEB3B',
//     '600': 'FDD835',
//     '700': 'FBC02D',
//     '800': 'F9A825',
//     '900': 'F57F17',
//     'A100': 'FFEB3B',
//     'A200': 'FFFF00',
//     'A400': 'FFEA00',
//     'A700': 'FFD600',
//     'contrastDefaultColor': 'light',    // whether, by default, text (contrast) on this palette should be dark or light
//     'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
//      '200', '300', '400', 'A100'],
//     'contrastLightColors': undefined    // could also specify this if default was 'dark'
//   });
//   $mdThemingProvider.theme('default')
//     .primaryPalette('colorPalette')
// });

 App.controller('movieSearchController', function($scope, $http, $routeParams, $timeout, favorites, tvs) {
     $scope.categories = [{
         id: "movie",
         name: "Movies",
         icon: "theaters"
     }, {
         id: "tv",
         name: "TV",
         icon: "live_tv"
     }, {
         id: "person",
         name: "People",
         icon: "person"
     }]
	 	 	 
	 $scope.icon_type = "favorite_border";    
     $scope.favorites = favorites;  
	 $scope.tvs = tvs;	 	 
	 
     $('#query').keyup(function(event) {         
		 var url = 'https://api.themoviedb.org/3/';
		 var key = '6693182da059a88baddfc039f502a88b';
		 var searchTerm = $('#query').val();
		 var searchType = $("#searchType option:selected").val();
	 
         $http.get(url + 'search/' + searchType + '?api_key=' + key + '&language=en-US&query=' + searchTerm)
             .success(function(data) {
                 $scope.movies = data.results;				 
             })
			 
		 $scope.type = searchType;
     })
     $scope.setfilter = function() {
         $scope.search = {};
         $scope.search[$scope.key] = $scope.filter;
     };	 
	 
 });
 
 App.controller('favoriteController', function($scope, $http, $routeParams, favorites, tvs) {
	 var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
	 
	 $scope.list = [];
	 $scope.tvlist = [];
	 $scope.icon_type = "favorite";
	 
	 $scope.$on('refresh', function (event, data) {
			favorites = data;
			$scope.list = [];
			angular.forEach(favorites, function(item){
			$http.get(url + 'movie/' + item + '?api_key=' + key + '&language=en-US')
				.success(function(data) {					
					$scope.list.push(data);				
				})
			})
	 });
	 
	 $scope.$on('refreshtv', function (event, data) {
			tvs = data;
			$scope.tvlist = [];
			angular.forEach(tvs, function(item){
			$http.get(url + 'tv/' + item + '?api_key=' + key + '&language=en-US')
				.success(function(data) {					
					$scope.tvlist.push(data);				
				})
			})
	 });
	 
	 this.refreshList = function () {				
		angular.forEach(favorites, function(item){
        $http.get(url + 'movie/' + item + '?api_key=' + key + '&language=en-US')
			.success(function(data) {					
				$scope.list.push(data);				
            })
		})
	 }
	 
	 this.refreshTV = function () {
		angular.forEach(tvs, function(item){
        $http.get(url + 'tv/' + item + '?api_key=' + key + '&language=en-US')
			.success(function(data) {					
				$scope.tvlist.push(data);				
            })
		})
	 }
	 
     this.refreshList();	
	 this.refreshTV();

 });
 
 App.controller('movieController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var movieID = $routeParams.id;
     $http.get(url + 'movie/' + movieID + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.movieData = [data];
         });
 });
 App.controller('movieCastController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var movieID = $routeParams.id;
     $http.get(url + 'movie/' + movieID + '/credits?api_key=' + key)
         .success(function(data) {
             $scope.actors = data.cast;
         });
 });
 App.controller('movieRolesController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/movie_credits?api_key=' + key)
         .success(function(data) {
             $scope.movieRoles = data.cast;
         });
 });

 App.controller('actorController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '?api_key=' + key)
         .success(function(data) {
             $scope.actorData = [data];
         });
 });

 App.controller('tvSearchController', function($scope, $http, $routeParams, $timeout) {
     $('#query').keyup(function(event) {
         var url = 'https://api.themoviedb.org/3/';
         var key = '6693182da059a88baddfc039f502a88b';
         var searchTerm = $('#query').val();
         $http.get(url + 'search/tv?api_key=' + key + '&language=en-US&query=' + searchTerm)
             .success(function(data) {
                 $scope.movies = data.results;
             })
             .error(function(data) {
                 $scope.movies = data.results;
             });
     })
 });

 App.service('seasonService', function() {
     var id = '1';
     var setID = function(x) {
         id = x;
     }
     var seasonID = function() {
         return id;
     }
     return {
         setID: setID,
         seasonID: seasonID
     };
 });

 App.controller('tvController', function($scope, $http, $routeParams, seasonService) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;
     $http.get(url + 'tv/' + tvID + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.tvData = [data];
         });

     $scope.isSet = function(tabNum) {
         return $scope.tab === tabNum;
     };

     $scope.setTab = function(tabNum) {
         $scope.tab = tabNum;
         console.log(tabNum);

         $http.get(url + 'tv/' + tvID + '/season/' + $scope.tab + '?api_key=' + key + '&language=en-US')
             .success(function(data) {
                 $scope.seasoneData = [data];
                 $scope.episodeData = data.episodes;
             });
     }

 });
 App.controller('episodeController', function($scope, $http, $routeParams, seasonService) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;

     $scope.season = seasonService.seasonID();

     $http.get(url + 'tv/' + tvID + '/season/' + $scope.season + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.seasonData = [data];
             $scope.episodes = data.episodes;
         });
 });
 App.controller('tvCastController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;
     $http.get(url + 'tv/' + tvID + '/credits?api_key=' + key)
         .success(function(data) {
             $scope.actors = data.cast;
         });
 });
 App.controller('tvRolesController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/tv_credits?api_key=' + key)
         .success(function(data) {
             $scope.tvRoles = data.cast;
         });
 });
 App.controller('socialController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/external_ids?api_key=' + key)
         .success(function(data) {
             $scope.smAccounts = [data];
         });
 });
 App.directive('errSrc', function() {
     return {
         link: function(scope, element, attrs) {
             element.bind('error', function() {
                 if (attrs.src != attrs.errSrc) {
                     attrs.$set('src', attrs.errSrc);
                 }
             });
         }
     }
 });
 App.controller('sidenavController', function($scope, $timeout, $mdSidenav, $log) {
     $scope.toggleLeft = buildDelayedToggler('left');
     $scope.toggleRight = buildToggler('right');
     $scope.isOpenRight = function() {
         return $mdSidenav('right').isOpen();
     };

     function debounce(func, wait, context) {
         var timer;
         return function debounced() {
             var context = $scope,
                 args = Array.prototype.slice.call(arguments);
             $timeout.cancel(timer);
             timer = $timeout(function() {
                 timer = undefined;
                 func.apply(context, args);
             }, wait || 10);
         };
     }

     function buildDelayedToggler(navID) {
         return debounce(function() {
             $mdSidenav(navID)
                 .toggle()
                 .then(function() {
                     $log.debug("toggle " + navID + " is done");
                 });
         }, 200);
     }

     function buildToggler(navID) {
         return function() {
             $mdSidenav(navID)
                 .toggle()
                 .then(function() {
                     $log.debug("toggle " + navID + " is done");
                 });
         }
     }
 })
 App.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log, $location) {
     $scope.close = function() {
         $mdSidenav('left').close()
             .then(function() {
                 $log.debug("close LEFT is done");
             });

     };
	 
	 $scope.go = function(path) {
		 $location.path(path);
	 }
 })
 App.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
     $scope.close = function() {
         $mdSidenav('right').close()
             .then(function() {
                 $log.debug("close RIGHT is done");
             });
     };
 });
 App.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
     $scope.alert = '';

     $scope.showGridBottomSheet = function() {
         $scope.alert = '';
         $mdBottomSheet.show({
             templateUrl: 'bottom-sheet-grid-template.html',
             controller: 'GridBottomSheetCtrl',
             clickOutsideToClose: true
         }).then(function(clickedItem) {
             $mdToast.show(
                 $mdToast.simple()
                 .textContent(clickedItem['name'] + ' clicked!')
                 .position('top right')
                 .hideDelay(1500)
             );
         });
     };
 })

 App.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
     $scope.items = [{
         name: 'Share',
         icon: 'share'
     }, {
         name: 'Mail',
         icon: 'mail'
     }, {
         name: 'Message',
         icon: 'message'
     }, {
         name: 'Copy',
         icon: 'content_copy'
     }, {
         name: 'Send Link',
         icon: 'link'
     }, {
         name: 'Print',
         icon: 'print'
     }, ];

     $scope.listItemClick = function($index) {
         var clickedItem = $scope.items[$index];
         $mdBottomSheet.hide(clickedItem);
     };
 })



 /**
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
 **/
