var Fiber = require('fiber');
require('libs/AudioDetect');
require('libs/LoadPlugin');
require('libs/Player');
require('libs/Plugin');
require('libs/DOMLoader.XMLHttp');
require('libs/Event');
require('libs/Queue');
require('libs/Base64');
require('libs/base64binary');

module.exports = Fiber.extend(function() {
    return {
        _velocity: 127,
        _delay: 0,
        init: function () {
            MIDI.loadPlugin({
                soundfontUrl: "./soundfont/",
                instrument: "acoustic_grand_piano"
            });
        },
        playNote: function (note) {
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note, this._velocity, this._delay);
            MIDI.noteOff(0, note, this._delay + 0.75);
        }
    }
});