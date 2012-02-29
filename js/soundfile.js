//soundfile abstraction

define(["third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function() {

    var soundfile = {
        model : Backbone.Model.extend({
            initialize : function(_url, _title) {
                _.bindAll(this, "changeFile");
                this.set({
                    url : _url,
                    title : _title,
                    files : ["sounds/demo.mp3", "sounds/drums.mp3", "sounds/sour.mp3", "sounds/song.mp3"]
                });
                this.changeFile(_url, _title);
            },
            changeFile : function(newUrl, title) {
                this.set({
                    url : newUrl
                });
                var urlSplit = newUrl.split("/");
                this.set({
                    title : title || urlSplit[urlSplit.length-1].replace(".mp3", "") || "untitled"
                });
                var that = this;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", this.get("url"), true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if(xhr.readyState = 4 && (xhr.status === 200 || xhr.status === 304)) {
                        that.set({
                            song : xhr.response
                        });
                    }
                };
                xhr.send(null);
            }
        }),
        view : Backbone.View.extend({
            className: "songView",
            initialize : function() {
                _.bindAll(this, "render", "nextFile");
                this.model.bind("change", this.render);
                this.template = _.template("<p><%= title %></p>");
            },
            render : function() {
                $(this.el).html(this.template({title: this.model.get("title")}));
                return this;
            },
            events: {
                "click": "nextFile"
            },
            nextFile : function(){
                //check if this is the first time we switch songs?
                if(this.model.get("currentFileIndex") === undefined){
                    this.model.set("currentFileIndex", 0);
                }
                var index = this.model.get("currentFileIndex");
                this.model.changeFile(this.model.get("files")[index]);
                this.render();
                this.model.set("currentFileIndex", (this.model.get("currentFileIndex")+1) % this.model.get("files").length);
                
            }
        })
    };
    return soundfile;
});
