const ENV = 'test';

var config = function(ENV){
	const config = {};
	config.ENV = ENV;
	switch(ENV){
		case 'dev':
			config.domain = 'http://192.168.96.23';
			break;
		case 'test':
      config.domain = 'http://106.15.179.23';
			break;
		case 'pro':
		default:
			config.domain = 'https://www.ktvme.com';
			break;
	}
	return config;
}

module.exports = config(ENV);