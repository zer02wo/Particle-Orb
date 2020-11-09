//Global variables
const particleContainer = document.getElementById("particle-container");
const numParticles = 250;
const orbRadius = 200;
let lifespan = 3;

//Parallax movement of particle cluster on mouse movement
window.addEventListener("mousemove", function(e) {
    if(lifespan > 0) {
        //Calculate parllax aspect ratio factor
        let widthAspect = (window.innerWidth / window.innerHeight);
        let heightAspect = (window.innerHeight / window.innerWidth);
        //Calculate parallax shift from window size and mouse position
        let widthParallax = ((window.innerWidth / 2) - e.x) / (100 * widthAspect);
        let heightParallax = ((window.innerHeight / 2) - e.y) / (100 * heightAspect);
        //Apply parallax shift as difference from midpoint of screen
        particleContainer.style.left = (50 + widthParallax) + "%";
        particleContainer.style.top = (50 + heightParallax) + "%";
    }
});

//Populate scene with particles
function createParticles() {
    //Create each particle
    for (let i = 0; i < numParticles; i++) {
        //Create particle div
        let particle = document.createElement("div");
        particle.classList.add("particle");
        //Add particle to DOM and set initial transformation state
        particleContainer.appendChild(particle);
        particle.style.opacity = 0;
        particle.style.transform = "rotateZ(0) rotateY(0) translateX(0)";
    }
    //Display initial animation after 1s
    setTimeout(swirlIn, 1000);
}

//Initial appearance animation for particles
function swirlIn() {
    //For each particle
    let particles = document.getElementsByClassName("particle");
    for(let particle of particles) {
        //Set opacity to opaque
        particle.style.opacity = 1;
        //Generate random y and z-axis rotation angles (between 0 and 360)
        let angY = Math.floor(Math.random() * 360);
        let angZ = Math.floor(Math.random() * 360);
        //Generate random x-axis displacement factor (between 1 and 1.25)
        let facX = (Math.random() * 0.25) + 1;
        //Apply random transformation to particles
        particle.style.transform = `rotateZ(${angZ}deg) rotateY(${angY}deg) translateX(${orbRadius * facX}px)`;
    }
    //Main animation loop
    lifespan--;
    if(lifespan > 0) {
        //Repeat animation every 5s until particles' lifespan ends
        setTimeout(swirlIn, 5000);
    } else {
        //Display particle exit animation
        swirlOut();
    }
}

//Final exit animation for particles
function swirlOut() {
    //For each particle
    let particles = document.getElementsByClassName("particle");
    for(let particle of particles) {
        //Set opacity to transparent
        particle.style.opacity = 0;
        //Generate random y and z-axis rotation angles (between 0 and 360)
        let angY = Math.floor(Math.random() * 360);
        let angZ = Math.floor(Math.random() * 360);
        //Apply random transformations and large x-axis factor to give ejection/dispersion effect 
        particle.style.transform = `rotateZ(${angZ}deg) rotateY(${angY}deg) translateX(${orbRadius * 7.5}px)`;
    }
    //Reset particles after 5s
    setTimeout(resetParticles, 5000);
}

//Reset particles after final animation completion
function resetParticles() {
    //Reset particle lifespan
    lifespan = 3;
    //For each particle
    let particles = Array.from(document.getElementsByClassName("particle"));
    for(let particle of particles) {
        //Remove from DOM
        particle.remove();
    }
    //Create new population of particles
    createParticles();
}

//Create initial particle population and begin animation
createParticles();