import React, { useEffect, useRef } from 'react';

const SparticlesEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null };

        // Gold palette for the circles
        const goldColors = ['#FFC107', '#FFD54F', '#FFB300'];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;

                // Determine type: Star (replacing red) or Gold Circle
                // 40% chance of being a star
                this.isStar = Math.random() < 0.4;

                if (this.isStar) {
                    this.size = Math.random() * 4 + 2; // Stars slightly larger
                    this.color = '#FFFFFF'; // White stars
                    this.twinkleSpeed = Math.random() * 0.05 + 0.01;
                    this.alpha = Math.random();
                    this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
                } else {
                    this.size = Math.random() * 3 + 1;
                    this.color = goldColors[Math.floor(Math.random() * goldColors.length)];
                }

                this.velocity = {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                };
            }

            drawStar(x, y, spikes, outerRadius, innerRadius) {
                let rot = Math.PI / 2 * 3;
                let step = Math.PI / spikes;

                ctx.beginPath();
                ctx.moveTo(x, y - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    let cx = x + Math.cos(rot) * outerRadius;
                    let cy = y + Math.sin(rot) * outerRadius;
                    ctx.lineTo(cx, cy);
                    rot += step;

                    cx = x + Math.cos(rot) * innerRadius;
                    let cy_inner = y + Math.sin(rot) * innerRadius;
                    ctx.lineTo(cx, cy_inner);
                    rot += step;
                }
                ctx.lineTo(x, y - outerRadius);
                ctx.closePath();
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "white";
                ctx.fill();
            }

            draw() {
                if (this.isStar) {
                    // Update Twinkle
                    if (this.alpha > 1 || this.alpha < 0.2) {
                        this.alphaDirection *= -1;
                    }
                    this.alpha += this.twinkleSpeed * this.alphaDirection;
                    // Clamp alpha
                    this.alpha = Math.min(Math.max(this.alpha, 0.2), 1);

                    // Draw 4-point Star
                    this.drawStar(this.x, this.y, 4, this.size, this.size / 3);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = this.color;
                    ctx.fill();
                }
            }

            update() {
                // Mouse Interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let maxDistance = 150;

                    if (distance < maxDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 50;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 50;
                        }
                    }
                }

                // Natural Movement
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                // Update base pos too so they don't snap back to original spawn
                this.baseX += this.velocity.x;
                this.baseY += this.velocity.y;

                // Boundary Check
                if (this.x > canvas.width) { this.x = 0; this.baseX = 0; }
                if (this.x < 0) { this.x = canvas.width; this.baseX = canvas.width; }
                if (this.y > canvas.height) { this.y = 0; this.baseY = 0; }
                if (this.y < 0) { this.y = canvas.height; this.baseY = canvas.height; }

                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40 bg-transparent"
        />
    );
};

export default SparticlesEffect;
