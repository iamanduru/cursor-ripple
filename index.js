 // Initialize canvas and context
 const canvas = document.getElementById('cursor-canvas');
 const ctx = canvas.getContext('2d');

 // Canvas sizing function
 function setCanvasSize() {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
 }

 setCanvasSize();
 window.addEventListener('resize', setCanvasSize);

 // Particle system setup
 const particles = [];
 const numberOfParticles = 15;
 const mousePosition = { x: 0, y: 0 };
 let mouseSpeed = 0;
 let lastMousePosition = { x: 0, y: 0 };

 class Particle {
     constructor() {
         this.reset();
     }

     reset() {
         // Initialize particle properties
         this.x = mousePosition.x;
         this.y = mousePosition.y;
         this.size = Math.random() * 4 + 2;
         this.speedX = Math.random() * 2 - 1;
         this.speedY = Math.random() * 2 - 1;
         this.life = 1;
         this.opacity = 1;
     }

     update() {
         // Update particle position and life
         this.x += this.speedX * mouseSpeed;
         this.y += this.speedY * mouseSpeed;
         this.life -= 0.01;
         this.opacity = this.life;

         if (this.life <= 0) {
             this.reset();
         }
     }

     draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
         ctx.fill();
     }
 }

 // Initialize particles
 for (let i = 0; i < numberOfParticles; i++) {
     particles.push(new Particle());
 }

 // Mouse movement handler with improved smoothing
 document.addEventListener('mousemove', (e) => {
     mouseSpeed = Math.hypot(e.clientX - lastMousePosition.x, e.clientY - lastMousePosition.y) * 0.1;
     mouseSpeed = Math.min(mouseSpeed, 4);

     lastMousePosition.x = mousePosition.x;
     lastMousePosition.y = mousePosition.y;
     mousePosition.x = e.clientX;
     mousePosition.y = e.clientY;
 });

 // Animation loop with optimized rendering
 function animate() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     particles.forEach(particle => {
         particle.update();
         particle.draw();
     });

     requestAnimationFrame(animate);
 }

 animate();