// API KEY 3d286b585e694be39fcdfd24d4856f2e

const input = document.querySelector('#inputButton');
const textTarget = document.querySelector('#inputText');


    function requestApi(){
          
        //checks if user input contains blank spaces and replaces them with '-'. 
        let news_source = textTarget.value;
        console.log(news_source);
        if(news_source.includes(' ')){
            news_source = news_source.split(' ');
            news_source = news_source.join('-');
            console.log(news_source);
        }       
        // news_source.split(/\s+/);
        
    
        const API_KEY = "3d286b585e694be39fcdfd24d4856f2e";
        const headers = new Headers();
        // const init = {method: 'GET', headers: `${headers}`, mode: 'cors', cache: 'default'};
        const url = `https://newsapi.org/v2/top-headlines?sources=${news_source}&apiKey=${API_KEY}`;
        // const url = `https://newsapi.org/v2/top-headlines?sources?category=${news_source}&apiKey=${API_KEY}`;
        getDataAsync();
    
        
        //Function to fetch url and get data parsed 
        async function getDataAsync(){
        try{
            const response = await fetch(url);
    
            const json = await response.json();
    
            console.log(json);  
            
            displayData(json);
    
        } catch(err){
            console.log(err);
        }

    }


        //parse JSON
        //create article elements
        //Display in web page 
        function displayData(data){

            const articles = data.articles;

            textTarget.value = articles[0].source.name.toUpperCase();
            

            //get the first 3 articles from the API and insert the info in the carousel
            for(let i = 1; i <= 3; i++){
               
                $(`.img__overlay${i}`).css('background-image', 'url(' + articles[i].urlToImage + ')');
                $(`.container${i}`).append(`<h1>${articles[i].title}</h1>`);                   
                $(`.container${i}`).append(`<p>${articles[i].description.slice(0, 100)}...</p>`);
                $(`.container${i}`).append(`<a href="#" class="button is-primary is-rounded">Read More</a>`);
            }

            // //create article html 
            // const output = articles.map( article => {          
            //     return `<div class="card" style="width: 18rem;">
            //                 <img class="card-img-top" src=${article.urlToImage} alt='article image'>
            //                 <div class="card-body">
            //                     <h4 class="card-title">${article.title}</h4>
            //                     <p class="card-text">${article.author}</p>
            //                     <p class="card-text">${article.publishedAt}</p>
            //                     <p class="card-text">${article.description}</p>
            //                     <a class="btn btn-primary" href='${article.url}' target='_blank>Read More</a>
            //                 </div>
            //             </div>`
            // });
            // document.getElementById('articles').innerHTML = output.join('');

            for(let article of articles){
                const el = document.createElement('div');
                el.classList.add('row');
                el.innerHTML = `
                                    
                                        <div class="card">     
                                            <div class="card-body">
                                                <img class="card-img-top" src=${article.urlToImage} alt='article image'>
                                                <h4 class="card-title">${article.title}</h4>
                                                <p class="card-text">${article.author}</p>
                                                <a class="btn btn-primary" href='${article.url}' target='_blank'>Read More</a>
                                            </div>
                                        </div>
                                    `;
                                    
                document.getElementById('articles').appendChild(el);
            }



        }        
    }

            //resets page when user search for another source
            function reset(){
                $('.container').empty();
                $('.img__all').css('background-image', 'none');
                
                $('#articles').empty();
            }


        input.addEventListener('click', () => {
            reset();
            requestApi();
    });









