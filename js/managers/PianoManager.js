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
            EventBus.on('keyboard_play', this.connectKeyboard, this);
            EventBus.on('mouse_play', this.playNote, this);
            EventBus.on('mouse_release', this.releaseNote, this);
            JMB.init(_.bind(function(MIDIAccess){
                this.MIDIAccess = MIDIAccess;
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
        connectDevices: function() {
            if(this.input){
                this.input.addEventListener("midimessage", _.bind(function(msg){
                    if(this.output){
                        this.output.sendMIDIMessage(msg);
                        EventBus.trigger('key_played', msg);
                    }
                },this));
            }
        },
        connectKeyboard: function(e) {
            if (!this.output) {
                return;
            }

            var noteNumbers = {
                //white keys
                65 : 48, //key a -> note c
                83 : 50, //key s -> note d
                68 : 52, //key d -> note e
                70 : 53, //key f -> note f
                71 : 55, //key g -> note g
                72 : 57, //key h -> note a
                74 : 59, //key j -> note b
                75 : 60, //key k -> note c
                76 : 62, //key l -> note d
                186 : 64, //key ; -> note e
                222 : 65, //key : -> note f
                //black keys
                87 : 49, //key w -> note c#/d♭
                69 : 51, //key e -> note d#/e♭
                84 : 54, //key t -> note f#/g♭
                89 : 56, //key y -> note g#/a♭
                85 : 58, //key u -> note a#/b♭
                79 : 61, //key o -> note c#/d♭
                80 : 63  //key p -> note d#/e♭
            };

            var keysPressed = {};

            if (event.type === "keydown") {
                if(e.which === 32) {
                    //spacebar acts as sustain pedal
                    this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 127));
                } else if(noteNumbers[e.which] && !keysPressed[e.which]) {
                    this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, noteNumbers[e.which], 100));
                    keysPressed[e.which] = true;
                    EventBus.trigger('key_played', this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, noteNumbers[e.which], 100));
                }
            }

            if (event.type === "keyup") {
                if(e.which === 32) {
                    this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 0));
                } else if(noteNumbers[e.which]) {
                    this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, noteNumbers[e.which], 0));
                    keysPressed[e.which] = false;
                    EventBus.trigger('key_played', this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, noteNumbers[e.which], 100));
                }
            }
        },
        playNote: function(note) {
            this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, note, 100));
            EventBus.trigger('key_played', this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, note, 100));
        },
        releaseNote: function(note) {
            this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, note, 0));
            EventBus.trigger('key_played', this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, note, 100));
        }
    };
});