const canvas = document.getElementById('canvas1');
canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext('2d');

const particlesArray = [];
let hue = 0;
const sprite = new Image();
sprite.src = './asset/3taeguk.png';


class Particle {
    constructor(x,y,directionX,directionY,size,color){
        this.x = x;
        this.y = y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = size;
        this.directionX = directionX;
        this.directionY = directionY;
        this.color = color;
    }
   
    draw(){
        //draw Circles
        /* ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill(); */

        //use image sprite
        ctx.drawImage(sprite, this.x - this.size * 4, this.y - this.size * 4, this.size * 8, this.size * 8);
       
    } 
    update(){
        if(this.x + this.size > canvas.width || this.x - this.size < 0){
             this.directionX = - this.directionX;
        }
       if(this.y + this.size > canvas.height || this.y - this.size < 0){
           this.directionY = - this.directionY;
       }        
       //if(this.size > 0.2) this.size -= 0.01;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

export function init(){
    let numberOfParticles = canvas.width / 40;
    for(let i = 0; i < numberOfParticles; i++){
        let size = Math.random() * 5 + 0.2;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = Math.random() * 5 - 1.5;
        let directionY = Math.random() * 4 - 1.5;
        let color = 'hsl(' + hue + ',100%, 50%)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//draw lines between particles when close
function connect(){
    for(let a = 0; a < particlesArray.length; a ++){
        for(let b = 0; b < particlesArray.length; b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < canvas.width / 10){
                ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

    }
}

export function animate(){    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();       
    }
    requestAnimationFrame(animate);
    //connect();
   hue += 2;
}
//init();
//animate();
