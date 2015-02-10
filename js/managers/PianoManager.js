var Fiber = require('fiber');
var _ = require("underscore");
var EventBus = require("eventBus");

module.exports = Fiber.extend(function () {
    return {
        input: null,
        output: null,
        init: function () {
            this.selectInput = document.getElementById("inputs");
            this.selectOutput = document.getElementById("outputs");

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