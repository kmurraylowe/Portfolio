/*
	Overflow by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 10

		};

	// Breakpoints.
		breakpoints({
			wide:    [ '1081px',  '1680px' ],
			normal:  [ '841px',   '1080px' ],
			narrow:  [ '737px',   '840px'  ],
			mobile:  [ null,      '736px'  ]
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-scroll');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly-middle').scrolly({
			speed: 1000,
			anchor: 'middle'
		});

		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return (breakpoints.active('<=mobile') ? 70 : 190); }
		});

	// Parallax background.

		// Disable parallax on IE/Edge (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.overflow_parallax', function() {

					// Adjust background position.
						$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.overflow_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
						if (breakpoints.active('<=narrow')) {

							$body.css('background-position', '');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.overflow_parallax');

				})
				.trigger('resize.overflow_parallax');

		}

	// // Poptrox.
	// 	$('.gallery').poptrox({
	// 		useBodyOverflow: false,
	// 		usePopupEasyClose: false,
	// 		overlayColor: '#0a1919',
	// 		overlayOpacity: 0.75,
	// 		usePopupDefaultStyling: false,
	// 		usePopupCaption: true,
	// 		popupLoaderText: '',
	// 		windowMargin: 10,
	// 		usePopupNav: true
	// 	});

})(jQuery);







// weather/local time api
const weather = {
	
	weatherapiKey: "c9eb346b814af2d646c89bc9c8eef6b6",
	APIKEY: "K5WRWVW5QSPG",
	fetchWeather: function(city){
		fetch("https://api.openweathermap.org/data/2.5/weather?q="
			+city			
			+"&units=metric&appid="
			+this.weatherapiKey
		)
		.then(res=> res.json())
		.then(data=>{
		console.log(data)
		let latcord = data.coord.lat
		let lngcord = data.coord.lon
		

		fetch("https://api.timezonedb.com/v2.1/get-time-zone?key=K5WRWVW5QSPG&format=json&by=position"
			+"&lat="+latcord
			+"&lng="+lngcord)
		.then(res=> res.json())
		.then(data=>{
			let currentTime = data.formatted.slice(10).substr(1,2)
			console.log(currentTime)
			if(currentTime>6&&currentTime<14){
				document.body.style.backgroundImage = "url('images/oceansand.jpg')"
				document.querySelector('.day').style.color = "rgb(105,105,105)"
				document.querySelector('p').style.color = "rgb(105,105,105)"
				document.querySelector('.image').src= "images/goldenlabsicon2.png"
				document.querySelector('#footer').style.color = "rgb(105,105,105)"
				document.querySelector('.icons').style.background = "rgba(105,105,105, 0.5)"
			}
		})

	})
	  },

}
weather.fetchWeather("sydney")





