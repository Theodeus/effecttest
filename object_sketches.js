var Effect = {
    input: AudioNode,
    output: AudioNode,
    connect: function(target){...}
};

var EffectView = {
    name: "filter" //string
};

var Delay = {
    delayNode: BPMDelay,
    setTempo: function(bpm){...},
    setSubdivision: function(subdivision){...}
};

var Compressor = {
    compressorNode: DynamicsCompressorNode
};

var Volume = {
    setLevel: function(level){...}
};

var Filter = {
    setFilterType: function(type){...},
    setFilterFrequency: function(freq){...},
    setFilterQ: function(q){...},
    setFilterGain: function(gain){...}
};

var Song = {
    source: "example.mp3", //string
    buffer: ArrayBuffer,
    songInstance: AudioSourceNode
};

var EffectPanel = {
    rotaries: Array<EffectRotary> //contains models for rotaries which represent effect parameters
};

var EffectPanelView = {
    rotaries: Array<EffectRotaryView> //contains views representing rotary models
};

var EffectRotary = {
    value: * //the value of the parameter the rotary represents, string or number
};

var EffectRotaryView = {
    parameter: "level" //string
};

var Stage = {
    effectChain: Array, //contains the effects that has been added, in the added order
};

var Preset = {
    effectChain: Array<Object>, //an array with the effects in the order they are added, containing serialized effects (in key:value hashes)
    name: "heavyDelay" //string
};






/**
 * Connects an effect to a destination.
 * 
 * @method connect
 * @param effect {Effect} The effect that is going to connect
 * @param target {AudioNode} The target to connect to
 * @return effect {Effect} Returns the effect to enable chaining
 * 
 */
function connect(effect, target){
    //connect the effect to the target
};

/**
 * Serializes an effect.
 * 
 * @method serializeEffect
 * @param effect {Effect} The effect that is going to be serialized
 * @return result {String} The serialized effect in string format
 * 
 */
function serializeEffect(effect){
    //serialize the effect
};

/**
 * Deserializes an effect.
 * 
 * @method deserializeEffect
 * @param serializedEffect {String} The serialized effect string 
 * @return effect {Effect} Returns an instance of the effect with the serialized settings
 * 
 */
function deserializeEffect(serializedEffect){
    //deserialize and call factory with the values
};

/**
 * Constructs an effect. Light factory pattern.
 * 
 * @method createEffect
 * @param type {String} The type of the effect to create
 * @param settings {Object} An object hash with the values the effect should be initialized with 
 * @return effect {Effect} Returns an instance of the effect type with the provided settings
 * 
 */
function createEffect(type, settings){
    //create the effect and apply settings
};


/**
 * Starts playback of the file with the settings applied
 * 
 * @method play 
 * @return void
 * 
 */
function play(){
    //start playback
};

/**
 * Save a preset
 * 
 * @method savePreset
 * @param preset {Preset} The preset to save 
 * @return void
 * 
 */
function savePreset(preset){
    //save preset
};

/**
 * Load a preset
 * 
 * @method loadPreset
 * @param presetName {string} The preset to load
 * @return preset {Preset} The preset
 * 
 */
function loadPreset(presetName){
    //return preset
};

/**
 * Delete a preset
 * 
 * @method savePreset
 * @param presetName {String} The preset to delete 
 * @return void
 * 
 */
function deletePreset(presetName){
    //delete preset
};








Effects = {
    connect: function(effect, target){...},
    serializeEffect: function(effect){...},
    deserializeEffect: function(serializedEffect){...},
    createEffect: function(type, settings){...}
};

Presets = {
    savePreset: function(preset){...},
    loadPreset: function(presetName){...},
    deletePreset: function(presetName){...}
};

Main = {
    play: function(){...}
};


