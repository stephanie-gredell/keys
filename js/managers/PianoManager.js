var Fiber = require('fiber');
var _ = require("underscore");
var EventBus = require("eventBus");
module.exports = Fiber.extend(function() {
    return {
        _velocity: 127,
        _delay: 0,
        init: function () {
            MIDI.loadPlugin({
                soundfontUrl: "./soundfont/",
                instrument: "acoustic_grand_piano",
                callback: function () {
                }
            });
        },
        playNote: function (note) {
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note, this._velocity, this._delay);
            MIDI.noteOff(0, note, this._delay + 0.75);

            JMB.init(_.bind(function(MIDIAccess){

                var inputs = MIDIAccess.enumerateInputs(),
                    outputs = MIDIAccess.enumerateOutputs();

                //create dropdown menu for MIDI inputs
                JMB.createMIDIDeviceSelector(this.selectInput,inputs,"input", _.bind(function(deviceId){
                    if(this.input){
                        this.input.close();
                    }
                    this.input = MIDIAccess.getInput(deviceId);
                    this.connectDevices(MIDIAccess);
                }, this));

                //create dropdown menu for MIDI outputs
                JMB.createMIDIDeviceSelector(this.selectOutput,outputs,"ouput", _.bind(function(deviceId){
                    if(this.output){
                        this.output.close();
                    }
                    this.output = MIDIAccess.getOutput(deviceId);
                    this.connectDevices(MIDIAccess);
                },this));

            }, this));
        },
        connectDevices: function(MIDIAccess) {
            if(this.input){
                this.input.addEventListener("midimessage", _.bind(function(msg){
                    if(this.output){
                        this.output.sendMIDIMessage(msg);
                        EventBus.trigger('key_played', msg);
                    }
                },this));
            }
        }
    }
});