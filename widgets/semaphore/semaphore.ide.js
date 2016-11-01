TW.IDE.Widgets.semaphore = function () {
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/SemaphoreWidget/ui/semaphore/semaphore.png'";
	};

	this.widgetProperties = function () {
		return {
			'name': 'Semaphore',
			'description': 'Simple semaphore widget.',
			'category': ['Common'],
			'properties': {
				'State': {
					'baseType': 'STRING',
					'defaultValue': 'Red',
					'isBindingTarget': true,
					'selectOptions': [
                        { value: 'Red', text: 'Red' },
                        { value: 'Orange', text: 'Orange' },
                        { value: 'Green', text: 'Green' }
                    ]
				},
				'Twostate': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Inverse': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Width': {
                    'description': 'Widget width',
                    'defaultValue': 50
                },
                'Height': {
                    'description': 'Widget height',
                    'defaultValue': 100
                }

			}
		}
	};

	this.afterSetProperty = function (name, value) {
		var refreshHtml = false;
		switch (name) {
			case 'State':
				this.semaphore.state(value);
				break;
			case 'Twostate':
				this.semaphore.twostate(value);
				break;
			case 'Inverse':
				this.semaphore.inverse(value);
				break;
			default:
				break;
		}
		return refreshHtml;
	};

	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		// return any HTML you want rendered for your widget
		var script = '<script src="../Common/extensions/SemaphoreWidget/ui/semaphore/semaphore.js" type="text/javascript"></script>';
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

};