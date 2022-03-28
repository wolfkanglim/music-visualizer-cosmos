let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
let x = 0;
let y = 0;

window.addEventListener('load', function(){
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0); 
})

window.addEventListener('resize', function(){
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);    
})

const mouse = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

class FlowFieldEffect{
    #ctx;
    #width;
    #height;
    #createGredient;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 0.5;
        //this.angle = 0;
        this.lastTime = 0;
        this.interval = 60;
        this.timer = 0;
        this.cellSize = 15;
        this.gredient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        this.vr = 0.02;
    }
    #createGradient(){
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop('0.1', '#28daad');
        this.gradient.addColorStop('0.2', '#cc3300');
        this.gradient.addColorStop('0.3', '#6699d8');
        this.gradient.addColorStop('0.6', '#ffffff');
        this.gradient.addColorStop('0.8', '#dd22dd');
        this.gradient.addColorStop('0.9', '#73d629');
    }
    #drawLine(angle, x, y){
       // const length = 300;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30);
        this.#ctx.stroke();
        
    }
    animate(timeStamp){
        let deltaTime = timeStamp - this.lastTime;
         this.lastTime = timeStamp;
        if(this.timer > this.interval){
            this.#ctx.fillStyle = 'rgba(0,0,0, .025)';
            this.#ctx.fillRect(0,0,this.#width, this.#height);
            this.radius += this.vr;
            if(this.radius > 15 || this.radius < - 15) this.vr *= -1;
        for(let y = 0; y < this.#height; y += this.cellSize){
            for(let x = 0; x < this.#width; x += this.cellSize){
                const angle = (Math.cos(x / 100) + Math.sin(y / 100)) * this.radius;
                this.#drawLine(angle, x, y);
            };            
        }     
        
        this.timer = 0;
        
        } else{
            this.timer += deltaTime;
        }       

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}
