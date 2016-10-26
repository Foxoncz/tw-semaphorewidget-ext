TW.Runtime.Widgets.semaphore = function () {
	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		// return any HTML you want rendered for your widget
		var script = '<script src="../Common/extensions/FoxonWidgets/ui/semaphore/semaphore.js" type="text/javascript"></script>';
		var html = '<div class="widget-content widget-semaphore">' +
						'<div class="semaphore-wrapper">' +
							'<div class="semaphore">' + 
								'<div class="light light-red"></div>' + 
								'<div class="light light-orange"></div>' + 
								'<div class="light light-green"></div>' + 
							'</div>' +
						'</div>' +
					'</div>';
				
		if (jQuery().semaphore){
			return html;
		}
		else {
			return script + html;
		}
	};

	this.afterRender = function () {
		this.semaphore = this.jqElement.semaphore();
		this.semaphore.state(this.getProperty('State'));
		this.semaphore.twostate(this.getProperty('Twostate'));
		this.semaphore.inverse(this.getProperty('Inverse'));
	};

	// this is called on your widget anytime bound data changes
	this.updateProperty = function (updatePropertyInfo) {
		// TargetProperty tells you which of your bound properties changed
		if (updatePropertyInfo.TargetProperty === 'State') {
			var value = updatePropertyInfo.SinglePropertyValue;
			this.semaphore.state(this.getProperty('State'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Twostate') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.semaphore.colorfull(this.getProperty('Twostate'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Inverse') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.semaphore.colorfull(this.getProperty('Inverse'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
	};
};