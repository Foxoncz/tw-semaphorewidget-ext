/*
 *  Project: Semaphore jQuery plugin
 *  Author: Jan Gabriel <jan.gabriel@foxon.cz>
 *  License: MIT
 */

(function($, window, document, undefined) {

	var pluginName = "semaphore",
		dataKey = "plugin_" + pluginName;

	var Plugin = function(element, options) {

		this.element = element;

		this.options = {
			inverse: false,
      twostate: false,
			state: "none"
		};

		this.init(options);
	};

	Plugin.prototype = {
		init: function(option) {
			$.extend(this.options, option);
			this.inverse(this.options.inverse);
			this.twostate(this.options.twostate);
      //this.state(this.options.state);
		},
    
		inverse: function(inverse) {
			if (typeof(inverse) != "undefined") {
				if (inverse) {
					this.options.inverse = true;
					this.element.find('.semaphore').addClass('semaphore-variant-inverse');
				} else {
					this.options.inverse = false;
					this.element.find('.semaphore').removeClass('semaphore-variant-inverse');
				}
				return this;
			} else {
				return this.options.inverse;
			}
		},
    
    twostate: function(twostate) {
			if (typeof(twostate) != "undefined") {
				if (twostate) {
					this.options.twostate = true;
					this.element.find('.semaphore').addClass('semaphore-twostate');
				} else {
					this.options.twostate = false;
					this.element.find('.semaphore').removeClass('semaphore-twostate');
				}
				return this;
			} else {
				return this.options.twostate;
			}
		},
    
		state: function(state) {
			if (typeof(state) != "undefined") {
        this.element.find('.light').removeClass('active');
        if(state === "Red"){
          this.element.find('.light').eq(0).addClass('active');
        }
        else if(state === "Orange"){
          this.element.find('.light').eq(1).addClass('active');
        }
        if(state === "Green"){
          this.element.find('.light').eq(2).addClass('active');
        }
				this.options.state = state;
				return this;
			} else {
				return this.options.state;
			}
		}
	};

	/*
	 * Plugin wrapper, preventing against multiple instantiations and
	 * return plugin instance.
	 */
	$.fn[pluginName] = function(options) {

		var plugin = this.data(dataKey);

		// has plugin instantiated ?
		if (plugin instanceof Plugin) {
			// if have options arguments, call plugin.init() again
			if (typeof options !== 'undefined') {
				plugin.init(options);
			}
		} else {
			plugin = new Plugin(this, options);
			this.data(dataKey, plugin);
		}

		return plugin;
	};

}(jQuery, window, document));