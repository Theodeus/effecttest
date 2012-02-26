//soundfile abstraction

define(["third-party/underscore-min", "third-party/backbone-min"], function() {

    var soundfile = {
        model : Backbone.Model.extend({
            initialize : function(_url, _title) {
                _.bindAll(this, "changeFile");
                this.set({
                    url : _url,
                    title : _title
                });
                this.changeFile(_url, _title);
            },
            changeFile : function(newUrl, title) {
                this.set({
                    url : newUrl
                });
                this.set({
                    title : title || "untitled"
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
            initialize : function() {
                _.bindAll(this, "render");
            },
            render : function() {
                this.el.innerHTML = "I'm a song!";
                return this;
            }
        })
    };
    return soundfile;
});
