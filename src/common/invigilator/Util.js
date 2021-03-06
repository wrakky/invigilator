/**
 * Utility helper functions
 */
(function(i) {

	i.common.Util = {

		/**
		 * Opens an external link in a new tab and log an event
		 * @param {String} url		The url to open
		 * @param {Boolean} noTrack	Whether not to track the link event
		 */
		openLink: function(url, noTrack) {

			console.info('Opening link: ', url);

			// track event
			if (!noTrack) {
				i.common.Analytics.event('Link', 'click', url);
			}

			// open url in new tab
			chrome.tabs.create({
				url: url
			});

		},

		/**
		 * Returns whether the object is empty (i.e. has no properties set)
		 * @param {Object} obj	The object to check
		 * @returns {Boolean}
		 */
		isEmptyObject: function(obj) {

			return Object.getOwnPropertyNames(obj).length === 0;

		},

		/**
		 * Copies all the properties from one object to another
		 * @param {Object} to	The object to copy properties to
		 * @param {Object} from	The object to copy properties from
		 * @returns {Object}
		 */
		extendObject: function(to, from) {

			for (var field in from) {

				if (from.hasOwnProperty(field)) {

					to[field] = from[field];

				}

			}

			return to;

		},

		/**
		 * Returns whether the extension is in dev mode or not
		 * @returns {boolean}
		 */
		isDevMode: function() {

			// get manifest details
			var manifest = chrome.runtime.getManifest();

			// dev mode manifest will not had the update_url property
			return !manifest.hasOwnProperty('update_url');

		},

		/**
		 * Logs a window.onerror event
		 * @param {String} message		The error message
		 * @param {String} url			The url from the error
		 * @param {Number} linenumber	The line number the error was on
		 * @returns {Boolean}
		 */
		logError: function(message, url, linenumber) {

			Invigilator.common.Analytics.event('Error', message, url + ':' + linenumber);

			return false;

		},

		/**
		 * Logs an exception
		 * @param {Execption} e	The exception object
		 */
		logException: function(e) {

			Invigilator.common.Analytics.event('Exception', e.message, e.stack);

		}

	};

})(Invigilator);