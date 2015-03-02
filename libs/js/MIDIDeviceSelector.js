(function (mb) {
  "use strict";

  mb.createMIDIDeviceSelector = function (options) {
    var select = options['select'],
        devices = options.devices,
        type = options.type,
        callback = options.callback;

    var createOption,
        getSelectedDevice;

    //helper function
    createOption = function (id, label) {
      var option = document.createElement("option");
      option.setAttribute("id", id);
      option.innerHTML = label;
      return option;
    };

    //called when a device is selected in a drowdown menu
    getSelectedDevice = function () {
      var device = select.options[select.selectedIndex];
      return device.id;
    };

    //for IE8
    mb.wrapElement(select);
    select.appendChild(createOption("-1", "choose a MIDI " + type));


    for (var i = 0; i < devices.length; i++) {
      var device = devices[i];
      if (typeof device !== 'undefined') {
        select.appendChild(createOption(i, device.deviceName));
      }
    }

    select.addEventListener("change", function (e) {
      callback(getSelectedDevice());
    }, false);

    return {
      getSelectedDevice: getSelectedDevice
    };
  };

}(JMB));