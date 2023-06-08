var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
        this.events[eventName] = this.events[eventName]
            ? this.events[eventName]
            : [];
        this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (callBackfn) {
                callBackfn(data);
            });
        }
    },
};
// Mediator object ####################################################################################


var model = [{}]

var controller = {
    init: function () {
        $.ajax({
            type: "GET"
            , url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            error: function (xhr) {
                console.log("false")
            },
            success: function (data, status, xhr) {


                for (let u = 0; u < data.results.length; u++) {

                    model[u] = { movie_image: data.results[u].poster_path }
                    model[u]["movie title"] = data.results[u].title
                    model[u]["movie summary"] = data.results[u].overview
                    model[u]["movie rating"] = data.results[u].vote_average
                }
                console.log(model)
                console.log(Date.now())
                
              
                eventsMediator.on("model finished loading",function(){
                   
                    view.init()
                    controller.load_data()
                    view.mount_modal()
                    

                })

               
                eventsMediator.emit("model finished loading")   

               
               
            }
            ,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWE3NDFmNGRlMWQ1NWE3MjlmNDc0ZTlmYWZhMDhiOSIsInN1YiI6IjY0NzcyZDhiMjU1ZGJhMDEyOWNlMzdiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sOGQ6the-Xg0E6xzsxofCl-Fh0p1ws1Reg3ffKNH-Cg'
            }

        }
        )
    },
    load_data: function () {
        $("document").ready(function () {
            var icons = document.querySelectorAll("i");
            for (var i = 0; i < model.length; i++) {
                // icons[i].remove()

                document.querySelectorAll(".card_body")[i].innerHTML += (`<img src=https://image.tmdb.org/t/p/w780/` + model[i].movie_image + `>`)
                document.querySelectorAll(".movie_title")[i].textContent = model[i]["movie title"]
                document.querySelectorAll(".movie_rating")[i].textContent = model[i]["movie rating"]



            }
        })
    }
}
// view object 
var view = {
    init: function () {
        // var body=document.querySelector("body")

        $("body").append(`<div class="modal_background">
      <div class="modal_content">
      <div class=" d-flex justify-content-end negative_mar">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x " viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
      <div class="d-flex">
        <img src="https://image.tmdb.org/t/p/w780//3bhkrj58Vtu7enYsRolD1fZdja1.jpg" class="img-fluid">
      <div class="modal_body">
        <div class="modal_title h4 mt-3 " align="center">
          The godfather
        </div>
        <span class="imdb_rating mx-3 "> IMDB Rating:</span><span class="rating imdb_rating"></span><span class="imdb_rating">/10</span>
        <div class="modal_description mx-3">
          Don vito corleone has the weight of the whole world on his shoulders. the big wheel keeps turning like ikes and anna maes

        </div>
          </div>
      </div>
  </div>
</div>`)

//Initializing the modal and the modal content

        for (var y = 0; y < model.length; y++) {


            $(".row").append(`<div class="col-md-3 border border-secondary  ">
                <div class=" card_wrapper mb-4">
                    <div class="card_body d-flex justify-content-center">
                      <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                    </div>
                    <div class="border  custom_height">
                    <div class="movie_title pt-3" align="center">
                    </div>
                    <div class="movie_rating" align="center"></div>
                  </div>
                </div>
            </div>`)
        }

//rendering the movie cards

    $(document).ready((function(){
        
    var body = document.querySelector("body")
    
    if(document.querySelector(".btn.btn-primary.prev")!=null){
        
    }
    else{
        body.innerHTML += `<div class="d-flex justify-content-center">
    <button class="btn btn-primary prev">Previous</button>
    <button class="btn btn-primary next">Next</button>
    </div>`
    }
    
        view.add_listeners()
}))

       
    },
    mount_modal: function () {
        var x=document.querySelector(".bi.bi-x")
        x.onclick=function(){
          var modal=document.querySelector(".modal_background")
          modal.style.display="none"
          console.log("window")
        }



    },
    add_listeners: function () {
        var page=0;
        var cards = document.querySelectorAll(".card_wrapper")
        cards.forEach(card => {

            card.addEventListener("click", function () {
                var modal = document.querySelector(".modal_background")
                modal.style.display = "block"
            })
        })

        var next_button = $(".btn.btn-primary.next")
        var previous_button = $(".btn.btn-primary.prev")
        next_button.on("click", function () {
            page=page+1
            
            $.ajax({
                type: "GET"
                , url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                error: function (xhr) {
                    console.log("false")
                },
                success: function (data, status, xhr) {
                    var integer=0


                    for (let u = 0; u < (data.results.length); u++) {
                        

                        model[u] = { movie_image: data.results[u].poster_path }
                        model[u]["movie title"] = data.results[u].title
                        model[u]["movie summary"] = data.results[u].overview
                        model[u]["movie rating"] = data.results[u].vote_average
                        
                    }
                    if(page>1){
                        
                    }
                    else{
                        $(".card_wrapper").empty()
                        eventsMediator.emit("model finished loading")  
                    }
                    

                }
                ,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWE3NDFmNGRlMWQ1NWE3MjlmNDc0ZTlmYWZhMDhiOSIsInN1YiI6IjY0NzcyZDhiMjU1ZGJhMDEyOWNlMzdiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sOGQ6the-Xg0E6xzsxofCl-Fh0p1ws1Reg3ffKNH-Cg'
                }

            }
            )
        })



        previous_button.on("click", function () {
            
                page = -1
            
           
            $.ajax({
                type: "GET"
                , url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
                error: function (xhr) {
                    console.log("false")
                },
                success: function (data, status, xhr) {
                    


                    for (let u = 0; u < (data.results.length); u++) {


                        model[u] = { movie_image: data.results[u].poster_path }
                        model[u]["movie title"] = data.results[u].title
                        model[u]["movie summary"] = data.results[u].overview
                        model[u]["movie rating"] = data.results[u].vote_average

                    }
                    if (page==-1 || page==0){
                        $(".card_wrapper").empty()
                        eventsMediator.emit("model finished loading")}
                        page=0
                    
                    

                }
                ,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWE3NDFmNGRlMWQ1NWE3MjlmNDc0ZTlmYWZhMDhiOSIsInN1YiI6IjY0NzcyZDhiMjU1ZGJhMDEyOWNlMzdiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sOGQ6the-Xg0E6xzsxofCl-Fh0p1ws1Reg3ffKNH-Cg'
                }

            }
            )
        })




    }

}

controller.init();






