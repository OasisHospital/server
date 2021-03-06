var config = {    
    couch_db_server: 'localhost',
    couch_db_port: '5984',
    couch_db_use_ssl: false,
    couch_db_changes_since: 'now',
    couch_admin_user: 'COUCH ADMIN USER GOES HERE',
    couch_admin_password: 'COUCH ADMIN PASSWORD GOES HERE',
    google_client_id: 'FOR GOOGLE SSO; GOOGLE CLIENT ID GOES HERE',
    google_client_secret: 'FOR GOOGLE SSO; GOOGLE CLIENT SECRET GOES HERE',
    server_port: '3000',
    server: 'localhost',
    ssl_cert: 'file location of ssl cert if needed',
    ssl_key: 'file location of ssl key if needed',    
    ssl_ca: [], //Array of file locations of trusted certificates in PEM format if needed
    use_ssl: false,
    imagesdir: __dirname+'/patientimages'
};

config.couch_credentials = function() {
    if (config.couch_admin_user && config.couch_admin_password) {
        return config.couch_admin_user + ":" + config.couch_admin_password + "@";
    } else { 
        return ''; 
    }
};
    
config.get_protocol = function(is_ssl) {
    return "http" + (is_ssl ? 's' : '') + '://';
};

config.server_url = config.get_protocol(config.use_ssl) + config.server;
if (config.server_port) {
    config.server_url += ":"+config.server_port;
}

config.couch_db_url =  config.get_protocol(config.couch_db_use_ssl) + config.couch_db_server +":"+config.couch_db_port;
config.couch_auth_db_url =  config.get_protocol(config.couch_db_use_ssl) + config.couch_credentials() + config.couch_db_server + ":"+config.couch_db_port;
config.search_url = 'http://localhost:9200'; //ELASTIC SEARCH URL
config.web_dir = __dirname+'/public';
module.exports = config;