var AudioNodes = AudioNodes || {};

/**
 * A distortion node with an input level. 
 * 
 * HIHIHISKRIVA BÄTTRE DOC 
 *
 * @class Distortion
 * @param gain {Number} The level into the distortion unit
 * @param curve {Number} range -1 to 1
 * @return {AudioNode} The distortion node
 */

AudioNodes.Distortion = function(context, gain, curve) {
    
    //normalize input
    if(!isNaN(curve)){
        curve = Math.max(curve, -1);
        curve = Math.min(curve, 1);
    } else {
        curve = 0;
    }
    if(!isNaN(gain)){
        gain = Math.max(gain, 0);
        gain = Math.min(gain, 1);
    } else {
        gain = 1;
    }
    
    //nodes
    var distortion = context.createWaveShaper(), 
    input = context.createGainNode(); 
    
    //ROUTING
    input.connect(distortion);

    this.input = input;
    this.output = distortion;
    
    
    this.setGain(gain);
    this.setShape(curve);
};
/**
 * Connects the distortion to another node.
 *
 * @method connect
 * @param target {AudioNode} The node the distortion should connect its output to
 */
AudioNodes.Distortion.prototype.connect = function(target) {
    this.output.connect(target);
};
/**
 * Sets the level into the distortion unit.
 *
 * @method setGain
 * @param value {Number} The gain ranging from 0 to 1
 */
AudioNodes.Distortion.prototype.setGain = function(value) {
    value = Math.max(value, 0);
    value = Math.min(value, 1);
    this.input.gain.value = value;
};
/**
 * Sets the distortion curve.
 *
 * @method setShape
 * @param shape {Number} The desired shape, ranging from -1 to 1
 */
AudioNodes.Distortion.prototype.setShape = function(shape) {
    shape = Math.max(shape, -1);
    shape = Math.min(shape, 1);
   // this.output.shape.value = shape;
};


/**
 * A filter node with seven different basic behaviours.
 *
 *  highpass - Lets frequencies above the cutoff frequency trough.
 *      Params:
 *          freqency - the cutoff frequency below which the frequencies get attenuated.
 *          q - controlls how peaked the response will be at the frequency. Higher value = more peaked response.
 *
 *  lowpass - Lets frequencies below the cutoff frequency trough.
 *      Params:
 *          freqency - the cutoff frequency above which the frequencies get attenuated.
 *          q - controlls how peaked the response will be at the frequency. Higher value = more peaked response.
 *
 *  bandpass - Lets a group of frequencies trough, centering at the provided frequecy.
 *      Params:
 *          freqency - the center of the frequency band.
 *          q - controlls the width of the band. The band narrows as the q-value increases.
 *
 *  lowshelf - Lets all frequencies trough, but boosts the lower frequencies
 *      Params:
 *          freqency - the upper limit of the frequencies to be boosted/attenuated.
 *          gain - the boost in dB to be applied.
 *
 *  highshelf - The opposite of the lowshelf, boosts the higher frequencies.
 *      Params:
 *          freqency - the lower limit of the frequencies to be boosted/attenuated.
 *          gain - the boost in dB to be applied.
 *
 *  peaking - Lets all frequencies trough and boosts/attenuates the specified frequecy.
 *      Params:
 *          freqency - the center frequency of where the boost is applied
 *          q - the width of the band of frequencies that are boosted. Higher value = narrower band.
 *          gain - the amount to be boosted in dB.
 *
 *  notch - The opposite of the bandpass filter. It don't let the frequecies centering at the provided frequency trough, but all others.
 *      Params:
 *          freqency - the center frequency where the notch is applied
 *          q - controlls the band width where the notch is applied. Higher value = narrower band.
 *
 *  allpass - Lets all frequencies trough but changes the phase relationship between the frequencies.
 *      Params:
 *          freqency - the frequency where the phase transition occurs.
 *          q - controlls how sharp the phase trasition is at the center of the frequency. Higher value = sharper trasition.
 *
 * @class Filter
 * @param type {String} one of the above types, for example "highpass".
 * @param parameters {Object} an object containing the above specified parameters for the choosen filter type.
 */

AudioNodes.Filter = function(context, type, parameters) {

    var filter = context.createBiquadFilter(), 
        entryNode = context.createGainNode(), 
        output = context.createGainNode(), 
        type = type || "lowpass", 
        frequency = parameters.frequency || 0, 
        q = parameters.q || 0, 
        gain = parameters.gain || 0;

    entryNode.connect(filter);
    filter.connect(output);

    filter.Q.value = q;
    filter.gain.value = gain;

    this.filter = filter;
    this.input = entryNode;
    this.output = output;
    this.q = filter.Q;
    this.frequency = filter.frequency;
    this.gain = filter.gain;
    this.context = context;
    
    this.setFilterType(type);
    this.setFrequency(frequency);
    if(filter.type === undefined) {
        console.log("Found no filter of type: " + type + ", setting to lowpass");
        filter.type = 0;
    }
};
/**
 * Connects the filter to another node.
 *
 * @method connect
 * @param target {AudioNode} The node the filter should connect its output to
 */
AudioNodes.Filter.prototype.connect = function(target) {
    this.output.connect(target);
};
/**
 * Change the Q value
 *
 * @method setQ
 * @param value {Number} The desired Q value
 */
AudioNodes.Filter.prototype.setQ = function(value) {
    this.filter.Q.value = value;
};
/**
 * Change the gain value
 *
 * @method setGain
 * @param value {Number} The desired gain value
 */
AudioNodes.Filter.prototype.setGain = function(value) {
    value = Math.max(value, -46);
    value = Math.min(value, 6);
    this.filter.gain.value = value;
};
/**
 * Change the frequency value
 *
 * @method setFrequency
 * @param value {Number} The desired frequency value
 */
AudioNodes.Filter.prototype.setFrequency = function(value) {
    value = Math.max(value, 20);
    value = Math.min(value, 20000);
    this.filter.frequency.cancelScheduledValues(0);
    this.filter.frequency.value = value;
    this.filter.frequency.setValueAtTime(value, this.context.currentTime);
};
/**
 * Change the filter type
 *
 * @method setFilterType
 * @param type {String} The filter type, as described above
 */
AudioNodes.Filter.prototype.setFilterType = function(type) {
    //check if we got a number
    if(!isNaN(type)){
        type = Math.max(type, 0);
        type = Math.min(type, 7);
        this.filter.type = type;
        return;       
    }
    
    var freqNow = this.filter.type;
    this.filter.type = this.filterTypes[type];
    if(this.filter.type === undefined) {
        console.log("Found no filter of type: " + type + ", no change made");
        filter.type = freqNow;
    }
};

AudioNodes.Filter.prototype.filterTypes = {
    lowpass : 0,
    highpass : 1,
    bandpass : 2,
    lowshelf : 3,
    highshelf : 4,
    peaking : 5,
    notch : 6,
    allpass : 7
};

/**
 * A stero delay. (Include routing?)
 *
 * @class StereoDelay
 * @param context {Object} The current audio context
 * @param tempo {int} (Optional) The tempo to set the delay to in beats per minute (default 90bpn)
 * @param subdivision {String} (Optional) The wanted subdivision. The possible values are:
 *  "32nd note", "16th note triplet", "dotted 32nd note", "16th note", "8th note triplet",
 *  "dotted 16th note", "8th note", "quarter note triplet", "dotted eighth note", "quarter note"
 *  "half note triplet". "dotted quarter note", "half note"
 *  (default "dotted eigth note")
 * @param secondDivision {String} (Optional) Pass a second subdivision string to use two different subdivisions for the two delay nodes.
 * @return {AudioNode} The stereo delay
 */

AudioNodes.StereoDelay = function(context, tempo, subdivision, secondDivision) {
    //nodes
    var bpmDelay1 = new AudioNodes.BpmDelay(context), bpmDelay2 = new AudioNodes.BpmDelay(context), delayFeedback1 = context.createGainNode(), delayFeedback2 = context.createGainNode(), delayPanLeft = context.createPanner(), delayPanRight = context.createPanner(), leftSplitter = context.createChannelSplitter(), rightSplitter = context.createChannelSplitter(), merger = context.createChannelMerger(), input = context.createGainNode(), preDelayNode = context.createGainNode(), postDelayNode = context.createGainNode(), entryNode = context.createGainNode(), output = context.createGainNode(), delayWet = context.createGainNode();

    delayPanLeft.setPosition(-1, 0, 0);
    delayPanRight.setPosition(1, 0, 0);

    delayFeedback1.gain.value = 0.5;
    delayFeedback2.gain.value = 0.5;

    if(tempo) {
        bpmDelay1.setTempo(tempo);
        bpmDelay2.setTempo(tempo);
    } else {
        bpmDelay1.setTempo(90);
        bpmDelay2.setTempo(90);
    }

    if(subdivision) {
        bpmDelay1.setDelayValue(subdivision);
        if(secondDivision) {
            bpmDelay2.setDelayValue(secondDivision);
        } else {
            bpmDelay2.setDelayValue(subdivision);
        }
    } else {
        bpmDelay1.setDelayValue("dotted eighth note");
        bpmDelay2.setDelayValue("dotted eighth note");
    }

    //ROUTING
    entryNode.connect(output);

    //delay line
    entryNode.connect(preDelayNode);
    preDelayNode.connect(bpmDelay1.delay);
    bpmDelay1.delay.connect(delayFeedback1);
    delayFeedback1.connect(bpmDelay2.delay);
    bpmDelay2.delay.connect(rightSplitter);
    bpmDelay2.delay.connect(delayFeedback2);
    delayFeedback2.connect(preDelayNode);
    bpmDelay1.delay.connect(leftSplitter);
    leftSplitter.connect(merger, 0, 0);
    rightSplitter.connect(merger, 1, 1);
    merger.connect(delayWet);
    delayWet.connect(output);

    this.input = entryNode;
    this.output = output;
    this.level = delayWet;

    this.delay1 = bpmDelay1;
    this.delay2 = bpmDelay2;
};
/**
 * Connects the stereo delay to another node.
 *
 * @method connect
 * @param target {AudioNode} The node the delay should connect its output to
 */
AudioNodes.StereoDelay.prototype.connect = function(target) {
    this.output.connect(target);
};
/**
 * Sets the level (wet) of the delay.
 *
 * @method setLevel
 * @param level {Number} The desired wet level of the delay, 0-1
 */
AudioNodes.StereoDelay.prototype.setLevel = function(level) {
    level = Math.max(0, level);
    level = Math.min(1, level);
    this.level.gain.value = level;
};
/**
 * Sets the beats per minute (bpm) of the delay.
 *
 * @method setTempo
 * @param tempo {int} The desired bpm of the delay
 * @param secondTempo {int} an optional second tempo to use on the second of the two delay nodes
 */
AudioNodes.StereoDelay.prototype.setTempo = function(tempo, secondTempo) {
    if(tempo) {
        this.delay1.setTempo(tempo);
        if(secondTempo) {
            this.delay2.setTempo(secondTempo);
        } else {
            this.delay2.setTempo(tempo);
        }
    } else {
        console.log("trying to set stero delay tempo without providing a tempo!");
    }
};
/**
 * Sets the desired subdivision of the delay.
 *
 * The possible values are:
 * "32nd note",
 * "16th note triplet",
 * "dotted 32nd note",
 * "16th note",
 * "8th note triplet",
 * "dotted 16th note",
 * "8th note",
 * "quarter note triplet",
 * "dotted eighth note",
 * "quarter note"
 * "half note triplet"
 * "dotted quarter note"
 * "half note"
 *
 * @method setSubdivision
 * @param subdivision {String} The desired subdivision of the delay
 */
AudioNodes.StereoDelay.prototype.setSubdivision = function(subdivision, secondSubdivision) {
    if(subdivision) {
        this.delay1.setDelayValue(subdivision);
        if(secondSubdivision) {
            this.delay2.setDelayValue(secondSubdivision);
        } else {
            this.delay2.setDelayValue(subdivision);
        }
    }
};
/**
 * A convolver unit. It can take either a string or a AudioBuffer as an argument. If it's a string the convolver will try to load a buffer using the string as an url.
 * If it's a buffer the convolver will use it as its impulse response.
 *
 * @class Convolver
 * @param impulse {String/AudioBuffer} Either an url or a buffer, as explained above.
 * @param level {Number} The level of the convolver, 0-1
 */
AudioNodes.Convolver = function(context, impulse) {
    var convolver = context.createConvolver(), entryNode = context.createGainNode(), output = context.createGainNode();

    if( typeof impulse === "string") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", impulse, true);
        xhr.responseType = "arraybuffer";
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
                    context.decodeAudioData(xhr.response, function(buffer) {
                        convolver.buffer = buffer;
                    }, function(e) {
                        if(e) {
                            console.error("error decoding data: " + e);
                        }
                    });
                }
            }
        };
        xhr.send(null);
    } else {
        convolver.buffer = impulse;
    }

    entryNode.connect(convolver);
    convolver.connect(output);

    this.input = entryNode;
    this.output = output;
    this.level = output;
};
/**
 * Connects the convolver to another node.
 *
 * @method connect
 * @param target {AudioNode} The node the convolver should connect its output to
 */
AudioNodes.Convolver.prototype.connect = function(target) {
    this.output.connect(target);
};
/**
 * Sets the level (wet) of the convolver.
 *
 * @method setLevel
 * @param level {Number} The desired wet level of the covolver, 0-1
 */
AudioNodes.Convolver.prototype.setLevel = function(level) {
    level = Math.max(0, level);
    level = Math.min(1, level);
    this.level.gain.value = level;
};
// Copyright 2011, Google Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

AudioNodes.BpmDelay = function(context) {
    this.delay = context.createDelayNode();
    this.context = context;
    this.tempo = 120;
    this.noteDivision = this.times[6];
    this.updateDelayTime();
};

AudioNodes.BpmDelay.prototype.setTempo = function(tempo) {
    this.tempo = tempo;
    this.updateDelayTime();
};

AudioNodes.BpmDelay.prototype.setDelayValue = function(v) {
    var i = 6;

    if(v == "32nd note") {
        i = 0;
    } else if(v == "16th note triplet") {
        i = 1;
    } else if(v == "dotted 32nd note") {
        i = 2;
    } else if(v == "16th note") {
        i = 3;
    } else if(v == "8th note triplet") {
        i = 4;
    } else if(v == "dotted 16th note") {
        i = 5;
    } else if(v == "8th note") {
        i = 6;
    } else if(v == "quarter note triplet") {
        i = 7;
    } else if(v == "dotted eighth note") {
        i = 8;
    } else if(v == "quarter note") {
        i = 9;
    } else if(v == "half note triplet") {
        i = 10;
    } else if(v == "dotted quarter note") {
        i = 11;
    } else if(v == "half note") {
        i = 12;
    } else {
        alert("bad BPM index");
    }

    this.setDelayIndex(i);
};

AudioNodes.BpmDelay.prototype.setDelayIndex = function(i) {
    this.noteDivision = this.times[i];
    this.updateDelayTime();
};

AudioNodes.BpmDelay.prototype.updateDelayTime = function() {
    var delayTime = 0.37299 / 44100.0 + 60 * this.noteDivision / this.tempo;
    this.delay.delayTime.value = delayTime;
};

AudioNodes.BpmDelay.prototype.times = [1 / 8., // 32nd note
(1 / 4.) * 2 / 3., // 16th note triplet
(1 / 8.) * 3 / 2., // dotted 32nd note
1 / 4., // 16th note
(1 / 2.) * 2 / 3., // 8th note triplet
(1 / 4.) * 3 / 2., // dotted 16th note
1 / 2., // 8th note
1 * 2 / 3., // quarter note triplet
(1 / 2.) * 3 / 2., // dotted eighth note
1, // quarter note
2 * 2 / 3., // half note triplet
1 * 3 / 2., // dotted quarter note
2               // half note
];
