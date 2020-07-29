'use strict'
var imageRendering = document.getElementById('ImageSection')
var imageLeft = document.createElement('img')
imageRendering.appendChild(imageLeft)
var imageCenter = document.createElement('img')
imageRendering.appendChild(imageCenter)
var imageRight = document.createElement('img')
imageRendering.appendChild(imageRight)
var uniqueImages = []
var totalClicks = 0
var allImages = []
var viewsForChart
var clicksForChart
var names = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
]
var paths = [
    'assets/bag.jpg',
    'assets/banana.jpg',
    'assets/bathroom.jpg',
    'assets/boots.jpg',
    'assets/breakfast.jpg',
    'assets/bubblegum.jpg',
    'assets/chair.jpg',
    'assets/cthulhu.jpg',
    'assets/dog-duck.jpg',
    'assets/dragon.jpg',
    'assets/pen.jpg',
    'assets/pet-sweep.jpg',
    'assets/scissors.jpg',
    'assets/shark.jpg',
    'assets/sweep.png',
    'assets/tauntaun.jpg',
    'assets/unicorn.jpg',
    'assets/usb.gif',
    'assets/water-can.jpg',
    'assets/wine-glass.jpg'
]
function Image(name, path) {
    this.name = name
    this.path = path
    this.views = 0
    this.clicks = 0
    allImages.push(this)
}
for (let i = 0; i < names.length; i++) {
    new Image(names[i], paths[i])
}
function randomNumber() {
    return Math.floor(Math.random() * allImages.length)
}
randomImage()
function randomImage() {
    while (uniqueImages.length < 6) {
        var random = randomNumber()
        if (!uniqueImages.includes(random)) {
            uniqueImages.push(random)
        }
    }
    removeImage()
    var newImagePathLeft = allImages[uniqueImages[0]].path
    var newImageNameLeft = allImages[uniqueImages[0]].name
    allImages[uniqueImages[0]].views++
    var newImagePathCenter = allImages[uniqueImages[1]].path
    var newImageNameCenter = allImages[uniqueImages[1]].name
    allImages[uniqueImages[1]].views++
    var newImagePathRight = allImages[uniqueImages[2]].path
    var newImageNameRight = allImages[uniqueImages[2]].name
    allImages[uniqueImages[2]].views++
    imageLeft.setAttribute('src', newImagePathLeft)
    imageLeft.setAttribute('alt', newImageNameLeft)
    imageLeft.setAttribute('id', 'ImageLeft')
    imageCenter.setAttribute('src', newImagePathCenter)
    imageCenter.setAttribute('alt', newImageNameCenter)
    imageCenter.setAttribute('id', 'ImageCenter')
    imageRight.setAttribute('src', newImagePathRight)
    imageRight.setAttribute('alt', newImageNameRight)
    imageRight.setAttribute('id', 'ImageRight')

}
function removeImage() {
    for (let i = 0; i < 3; i++) {
        uniqueImages.shift()
    }
}
imageRendering.addEventListener('click', eventHandler);
function eventHandler() {
    if (totalClicks < 25) {
        var clickedElementId = event.target.id
        if (clickedElementId === 'ImageLeft' || clickedElementId === 'ImageCenter' || clickedElementId === 'ImageRight') {
            totalClicks++
            if (clickedElementId == 'ImageLeft') {
                allImages[uniqueImages[0]].clicks++
            }
            if (clickedElementId == 'ImageCenter') {
                allImages[uniqueImages[1]].clicks++
            }
            if (clickedElementId == 'ImageRight') {
                allImages[uniqueImages[2]].clicks++
            }
        }
        randomImage()
    } else {
        message()
        viewsAndClicksForChart()
        chart()
        imageRendering.removeEventListener('click', eventHandler);
    }
}
function message() {
    var liRendering = document.getElementById('ul')
    for (let i = 0; i < allImages.length; i++) {
        if (allImages[i].clicks > 0) {
            var liEl = document.createElement('li')
            liRendering.appendChild(liEl)
            liEl.textContent = allImages[i].name + ' has been shown ' + allImages[i].views + ' and has been clicked ' + allImages[i].clicks;
            console.log(allImages)
        }
    }

}
function viewsAndClicksForChart() {
    viewsForChart = []
    clicksForChart = []
    for (let i = 0; i < allImages.length; i++) {
        viewsForChart.push(allImages[i].views)
        clicksForChart.push(allImages[i].clicks)
    }
    storage()

}
function chart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '# of Views',
                data: viewsForChart,
                backgroundColor: '#003153',
                borderColor:
                    'white'
                ,
                borderWidth: 1
            }, {
                label: '# of Clicks',
                data: clicksForChart,
                backgroundColor:
                    'yellow'
                ,
                borderColor:
                    'white'
                ,
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function storage() {
    localStorage.setItem('Images', JSON.stringify(allImages))
    JSON.parse(localStorage.getItem('Images'))
}
