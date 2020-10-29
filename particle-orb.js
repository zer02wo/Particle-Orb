//Global constants
const particleContainer = document.getElementById("particle-container");
const numParticles = 250;
const orbRadius = "200px";

//Create each particle
for(let i = 0; i < numParticles; i++) {
    //Create particle div
    let particle = document.createElement("div");
    particle.classList.add("particle");
    //Set random angle of rotation between 0 and 360
    let angY = Math.floor(Math.random() * 360);
    let angZ = Math.floor(Math.random() * 360);
    //Add particle to DOM and apply transformations
    particleContainer.appendChild(particle);
    particle.style.transform = `rotateY(${angY}deg) rotateZ(${angZ}deg) translateX(${orbRadius})`;
}