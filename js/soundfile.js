//This is a wrapper for the mp3

define(["backbone"], function(Backbone) {

    var externalSongSelectView = Backbone.View.extend( {            
            m_soundfileView:null,
            m_model:null,

            initialize: function(a_soundfileView,a_model) {
                m_soundfileView = a_soundfileView;
                this.m_model = a_model;                
                
                this.m_fileHandler = document.createElement("input");
                this.m_fileHandler.setAttribute("type","file");
                var f_that = this;
                //event onchange !    
                this.m_fileHandler.addEventListener("change",function() { f_that.ChangeExternalSong() } );           
                //this.render();
            },

            m_fileHandler:null,

            render: function() {
                
                //Draws the file dialog
                $("#externalSongSelection").html(this.m_fileHandler);           
            },

            hideme : function() {
                //Removes the file dialog
                $("#externalSongSelection").html("");
            },            

            //Selected a song and reads the file data and sets the model song then after transfering it from blob to arraybuffer            
            ChangeExternalSong : function() {
                var f_file = this.m_fileHandler.files[0];

                if (f_file) {
                    var f_extension = f_file.fileName.split(".");

                    //If mp3 format
                    if (f_extension[f_extension.length - 1] === "mp3") {                        
                        var blob = f_file.webkitSlice(0 , f_file.size);
                        //Need to get the data...

                        var reader = new FileReader();
                        
                        var f_that = this;

                        reader.onloadend = function(evt) {
                            if (evt.target.readyState == FileReader.DONE) {
                                f_that.m_model.set("song", evt.target.result);
                            }
                        }

                        reader.readAsArrayBuffer(blob);                        

                        console.log("mp3 file loaded.. maybe!");

                    //if not mp3 format
                    } else {
                        console.log("Bad format");

                        //Resets the input field
                        var f_that = this;

                        this.m_fileHandler = document.createElement("input");
                        this.m_fileHandler.setAttribute("type","file");
                        this.m_fileHandler.addEventListener("change",function() { f_that.ChangeExternalSong() } );                         
                        
                        //Renders the new input field
                        this.render();    
                    }
                } 
            }


            
                    
    });

    var soundfile = {
        //The soundfile model has a song property which is a sound buffer (a mp3 in Web Audio terms) and some functionality to load new mp3's
        model : Backbone.Model.extend({
            initialize : function(_url, _title) {
                _.bindAll(this, "changeFile");
                this.set({
                    url : _url,
                    title : _title,
                    //these can be switched between by clicking the song box in the GUI
                    files : ["sounds/demo.mp3", "sounds/drums.mp3", "sounds/sour.mp3", "sounds/song.mp3 , /external"]
                });
                this.changeFile(_url, _title);
            },
            changeFile : function(newUrl, title) {
                this.set({
                    url : newUrl
                });
                //Extract the file name and use it as the title if no title is defined. 
                var urlSplit = newUrl.split("/");
                this.set({
                    title : title || urlSplit[urlSplit.length-1].replace(".mp3", "") || "untitled"
                });
                
                var that = this,
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

                //Had to call it here cause this.model was undefined if doing new externalSongSelectView few lines down in the code
                this.externalSongView = new externalSongSelectView(this, this.model);

                this.template = _.template("<p><%= title %></p>");
                this.render();
                
            },  
            
            externalSongView:null,        
                    
            render : function() {            
                
                //External song is selected
                if (this.model.get("currentFileIndex") === this.model.get("files").length - 1)
                {
                    
                    $(this.el).html(this.template({title: this.model.get("title")}));
                    this.externalSongView.render();
                }
                else
                {
                    $(this.el).html(this.template({title: this.model.get("title")}));
                    this.externalSongView.hideme();
                }               

                return this;
            },
            events: {
                "click": "nextFile"
            },
            //When the box s clicked it should cycle trough the availible mp3's
            nextFile : function(){
                //check if this is the first time we switch songs? We need an index to choose a song from the song array...
                if(this.model.get("currentFileIndex") === undefined){
                    this.model.set("currentFileIndex", 0);
                }
                var index = this.model.get("currentFileIndex");

                //If it's the last in the index it's external
                if (index === this.model.get("files").length - 1)
                {                
                    this.model.set("title", "external");                   
                }
                else
                {
                    //Change the file!
                    this.model.changeFile(this.model.get("files")[index]);
                                 
                }                
                
                //Re-render the songbox.   
                this.render();
                this.model.set("currentFileIndex", (index+1) % this.model.get("files").length);
                
            }
        })
    };
    return soundfile;
});
