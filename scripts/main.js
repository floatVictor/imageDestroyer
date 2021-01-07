let $searchBar = document.querySelector('.searchBar')
let $searchButton = document.querySelector('.searchButton')
let $homeButton = document.querySelector('.homeButton')
let $dlButton = document.querySelector('.dlButton')
let $something = document.querySelector('.something')
let $layerAcontainer = document.querySelector('.layerAcontainer')
let $layerBcontainer = document.querySelector('.layerBcontainer')
let $canvasContainer = document.querySelector('.canvasContainer canvas')
let $image = document.querySelector('.image img')
let $again = document.querySelector('.again')
let $rand = document.querySelector('.rand')
let $stop = document.querySelector('.stop input')

console.log($again)
console.log($again)

let dataImage = null

for (const element of [$searchButton,$again]) {
    element.addEventListener('click',()=>{
        console.log($something.value)

        /*
        img = createImg("../image/lzutrebail.png",start).parent('#image')
        console.log(img)
        $layerAcontainer.style.visibility = 'hidden'
        $layerBcontainer.style.visibility = 'visible'

        $stop.value = 'pause'
        */

        
        fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${$something.value}&pageNumber=1&pageSize=10&autoCorrect=true`, {
        'method': 'GET',
        'headers': {
            'x-rapidapi-key': '4e763c90edmsh012004912f7a4d1p1c68c6jsn69ab794d5289',
            'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
        })

        .then(response => response.json())
        .then((data) => {

            $stop.style.backgroundColor = 'var(--B-color)'

            //canvasContainer.style.visibility = 'visible'*
            dataImage = data

            $layerAcontainer.style.transition = 'opacity 0.1s ease-in'
            $layerAcontainer.style.opacity = '0%'
            $layerAcontainer.style.visibily = 'hidden'
            $layerAcontainer.style.pointerEvents = 'none'
        
            $layerBcontainer.style.opacity = '100%'
            $layerBcontainer.style.visibily = 'visible'
            $layerBcontainer.style.pointerEvents = 'all'
           
            go = true
            let i = 0;

            while(!checkURL(dataImage.value[i].url)) i++

            img = createImg(dataImage.value[i].url,start).parent('#image')
            console.log(data);

            //$image.visibility = 'visible'
            //img = loadImage(dataImage.value[0].url, start)


        })
        .catch(err => {
            console.error(err)
        })
    })
  }

$homeButton.addEventListener('click',()=>{

    $something.value = ''

    $layerAcontainer.style.transition = 'opacity 1.2s ease-in'
    $layerAcontainer.style.opacity = '100%'
    $layerAcontainer.style.visibily = 'visible'
    $layerAcontainer.style.pointerEvents = 'all'

    $layerBcontainer.style.opacity = '0%'
    $layerBcontainer.style.visibily = 'hidden'
    $layerBcontainer.style.pointerEvents = 'none'
    
    goRand = true;
    go = false
    

})

$rand.addEventListener('click',()=>{

    goRand = true;

})

$dlButton.addEventListener('click',()=>{

    saveCanvas(canvas, 'savedFrame', 'jpg');

})

$stop.addEventListener('click',()=>{

    if(go){
         go = false
         $stop.style.backgroundColor = 'var(--A-color)'
    }
    else{
         go = true
         $stop.style.backgroundColor = 'var(--B-color)'
    }
    
  console.log(go);

})


console.log($something)

function checkURL(url) {

    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null)

}
