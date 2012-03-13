//This is a wrapper for the mp3

define(["backbone"], function(Backbone) {

    var soundfile = {
        //The soundfile model has a song property which is a sound buffer (a mp3 in Web Audio terms) and some functionality to load new mp3's
        model : Backbone.Model.extend({
            initialize : function(_url, _title) {
                _.bindAll(this, "changeFile");
                this.set({
                    url : _url,
                    title : _title,
                    //these can be switched between by clicking the song box in the GUI
                    files : ["sounds/demo.mp3", "sounds/drums.mp3", "sounds/sour.mp3", "sounds/song.mp3"]
                });
                this.changeFile(_url, _title);
            },
            changeFile : function(newUrl, title) {
                var that = this,
                    xhr;
                
                this.set({
                    url : newUrl
                });
                
                //Extract the file name and use it as the title if no title is defined.
                var urlSplit;
                if(newUrl instanceof File){
                    urlSplit = [newUrl.name];
                } else {
                    urlSplit = newUrl.split("/");
                }

                this.set({
                    title : title || urlSplit[urlSplit.length-1].replace(".mp3", "") || "untitled"
                });
                
                 if(newUrl instanceof File){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        that.set({
                            song : e.target.result
                        });
                    }
                    reader.readAsArrayBuffer(newUrl);
                    return;
                }
                
                xhr = new XMLHttpRequest();
                    
                //Load the new mp3...    
                xhr.open("GET", this.get("url"), true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if(xhr.readyState = 4 && (xhr.status === 200 || xhr.status === 304)) {
                        //...and set it as the model song when it's finished loading.
                        that.set({
                            song : xhr.response
                        });
                    }
                };
                xhr.send(null);
            }
        }),
        
        //This is the song box with a title in the GUI
        view : Backbone.View.extend({
            className: "songView",
            initialize : function() {
                _.bindAll(this, "render", "nextFile", "onDragOver", "onDrop");
                this.model.bind("change", this.render);
                this.template = _.template("<p><%= title %></p>");
            },
            render : function() {
                $(this.el).html(this.template({title: this.model.get("title")}));
                return this;
            },
            events: {
                "click": "nextFile",
                "dragover": "onDragOver",
                "drop": "onDrop"
            },
            //When the box s clicked it should cycle trough the availible mp3's
            nextFile : function(){
                //check if this is the first time we switch songs? We need an index to choose a song from the song array...
                if(this.model.get("currentFileIndex") === undefined){
                    this.model.set("currentFileIndex", 0);
                }
                var index = this.model.get("currentFileIndex");
                //Change the file!
                this.model.changeFile(this.model.get("files")[index]);
                //Re-render the songbox.
                this.render();
                this.model.set("currentFileIndex", (this.model.get("currentFileIndex")+1) % this.model.get("files").length);
                
            },
            onDragOver : function(e) {
                e.stopPropagation();
                e.preventDefault();
                e.originalEvent.dataTransfer.dropEffect = 'copy';
            },
            onDrop : function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log(e.originalEvent.dataTransfer.files[0]);
                var file = e.originalEvent.dataTransfer.files[0];
                this.model.changeFile(file);
            }
        })
    };
    return soundfile;
});
