//soundfile abstraction

define(function(){
    
    var xhr, onLoad, song = "hej", url = "sounds/song.mp3", title = "untitled";
    
    onLoad = function(){
        if(xhr.readyState = 4 && (xhr.status === 200 || xhr.status === 304)){
            song = xhr.response;
        }
    };
    
    return {        
        changeFile : function(newUrl, title){           
            url = newUrl;
            title = title || "untitled";             
            xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = onLoad;
            xhr.send(null);
        },
        getSong : function() {
            return song;
        }
        
    };
});
