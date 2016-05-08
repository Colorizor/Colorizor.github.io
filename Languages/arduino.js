(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    //Problem Characters
    ['\\$&\/', /[\'\"\<\>]/igm],
    ['\:\/\\\/', /\:\/\//igm],
    //Syntax
    ['<span id="value">$&</span>', /(\\\'\/(.*?)\\\'\/|\\\"\/(.*?)\\\"\/)/igm],
    ['<span id="attribute">$&</span>', /\b(DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/igm],
    ['<span id="reserved">$&</span>', /\b(runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer)\b/igm],
    ['<span id="parameter">$&</span>', /\b(disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/igm],
    ['<span id="selector">$&</span>', /\b(boolean|byte|word|string|String|array|setup|loop|while|catch|for|if|do|goto|try|switch|case|else|default|break|continue|return|KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD)\b/igm],
    ['<span id="comment">$&</span>', /\/\*([\s\S]+)\*\//igm],
    ['<span id="comment">$&</span>', /\/\/.+/igm],
    ['<span id="unit">$&</span>', /([\d]|\-[\d]|\.\d)+/igm],
    //Clean
    ['', /(?:(?!([\s\S]+)\/\*))(\<span(.*?)\>|\<\/span\>)(?=([\s\S]*?)\*\/)/igm],
    ['', /(?:(?!.*?\/\/))(\<span(.*?)\>|\<\/span\>)(?=(.*?)\<\/span\>$)/igm],
    ['', /(?:(?!.*?\\\'\/.+\'\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\'\/)/igm],
    ['', /(?:(?!.*?\\\"\/.+\"\/))(\<span(.*?)\>|\<\/span\>)(?=.*?\\\"\/)/igm],
    //Fix Characters
    ['\'', /\\\'\//igm],
    ['\"', /\\\"\//igm],
    ['&lt;', /\\\<\//igm],
    ['&gt;', /\\\>\//igm],
    ['\:\/\/', /\:\/\\\//igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="arduino"]'), function() {
    //--------------------------------------------------SIZING
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //--------------------------------------------------FIND
    for (a = 0; a < regex.length; a++) {
      var str = $(this).html();
      str = str.replace(regex[a][1], regex[a][0]);
      $(this).html(str);
    }
  });
})();
