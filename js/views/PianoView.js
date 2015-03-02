var BaseView = require('views/BaseView');
var template = require('templates/piano');
var deviceselector = require('templates/deviceSelector');
var $ = require('jquery');
var EventBus = require("eventBus");

var noteNumbers = {
  //white keys
  65: 48, //key a -> note c
  83: 50, //key s -> note d
  68: 52, //key d -> note e
  70: 53, //key f -> note f
  71: 55, //key g -> note g
  72: 57, //key h -> note a
  74: 59, //key j -> note b
  75: 60, //key k -> note c
  76: 62, //key l -> note d
  186: 64, //key ; -> note e
  222: 65, //key : -> note f
  //black keys
  87: 49, //key w -> note c#/d♭
  69: 51, //key e -> note d#/e♭
  84: 54, //key t -> note f#/g♭
  89: 56, //key y -> note g#/a♭
  85: 58, //key u -> note a#/b♭
  79: 61, //key o -> note c#/d♭
  80: 63  //key p -> note d#/e♭
};

module.exports = BaseView.extend({
  keysPressed: {},
  isKeyDown: false,
  events: {
    'mousedown #piano': 'clickPlay',
    'mouseup #piano': 'clickRelease'
  },
  initialize: function (options) {
    $(this.el).append(deviceselector());
    $(this.el).append(template());
    $('body').append(this.el);
  },
  afterRender: function () {
    this.selectInput = document.getElementById("inputs");
    this.selectOutput = document.getElementById("outputs");
    $(document).on('keydown', _.bind(this.keyPlay, this));
    $(document).on('keyup', _.bind(this.keyRelease, this));

    this.initJMB();
  },
  initJMB: function () {
    JMB.init(_.bind(function (MIDIAccess) {
      this.MIDIAccess = MIDIAccess;
      var inputs = MIDIAccess.enumerateInputs(),
          outputs = MIDIAccess.enumerateOutputs();

      var inputOptions = {
        select: this.selectInput,
        devices: inputs,
        type: "input",
        callback: _.bind(this._createInput, this)
      };

      var outputOptions = {
        select: this.selectOutput,
        devices: outputs,
        type: "output",
        callback: _.bind(this._createOutput, this)
      };

      JMB.createMIDIDeviceSelector(inputOptions);
      JMB.createMIDIDeviceSelector(outputOptions);

    }, this));
  },
  _createInput: function (deviceId) {
    if (this.input) {
      this.input.close();
    }
    this.input = this.MIDIAccess.getInput(deviceId);
    this._connectDevices(this.MIDIAccess);
  },
  _createOutput: function (deviceId) {
    if (this.output) {
      this.output.close();
    }
    this.output = this.MIDIAccess.getOutput(deviceId);
    this._connectDevices(this.MIDIAccess);
  },
  _connectDevices: function () {
    if (this.input) {
      this.input.addEventListener("midimessage", _.bind(function (msg) {
        if (this.output) {
          this.output.sendMIDIMessage(msg);
        }
      }, this));
    }
  },
  keyPlay: function (event) {
    var msg = this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, noteNumbers[event.which], 100);
    if (event.which === 32) {
      //spacebar acts as sustain pedal
      this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 127));
    } else if (noteNumbers[event.which] && !this.keysPressed[event.which]) {
      this.output.sendMIDIMessage(msg);
      this.keysPressed[event.which] = true;
    }

    this.$el.find('[data-note=\'' + msg.data1 + '\']').addClass('active');
  },
  keyRelease: function (event) {
    var msg = this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, noteNumbers[event.which], 0);
    if (event.which === 32) {
      this.output.sendMIDIMessage(this.MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 0));
    } else if (noteNumbers[event.which]) {
      this.output.sendMIDIMessage(msg);
      this.keysPressed[event.which] = false;
      this.$el.find('[data-note=\'' + msg.data1 + '\']').removeClass('active');
    }

  },
  clickPlay: function (event) {
    var note = $(event.target).data('note');
    var msg = this.MIDIAccess.createMIDIMessage(JMB.NOTE_ON, note, 100);
    this.output.sendMIDIMessage(msg);
    $(event.target).addClass('active');
  },
  clickRelease: function (event) {
    var note = $(event.target).data('note');
    var msg = this.MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, note, 0);
    $(event.target).removeClass('active');
  },
  id: "piano-wrapper"
});