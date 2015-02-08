// Require
var watchr = require('watchr');
var exec = require('child_process').exec;

watchr.watch({
    paths: ['js','css','templates'],
    listeners: {
        error: function(err){
            console.log('an error occured:', err);
        },
        change: function(){
            exec('make build', function(error) {
                console.log(">>> built");
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    }
});