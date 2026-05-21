document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (preloader && loadingBar) {
        document.body.classList.add('no-scroll');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // increment randomly between 5 and 20
            
            if (progress >= 100) {
                progress = 100;
                loadingBar.style.width = progress + '%';
                clearInterval(interval);
                
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.classList.remove('no-scroll');
                    }, 500); // fade out time
                }, 400); // short delay at 100%
            } else {
                loadingBar.style.width = progress + '%';
            }
        }, 150); // every 150ms
    }

    // Reveal animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.section-title, .char-card, .scene-card, .timeline-item, .about-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));
    
    // Glowing Particles in Hero
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        hero.appendChild(particlesContainer);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 5 + 2;
                const left = Math.random() * 100;
                const duration = Math.random() * 10 + 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${left}%`;
                particle.style.animationDuration = `${duration}s`;
                
                particlesContainer.appendChild(particle);
                
                // Remove particle after animation to prevent DOM bloat, though infinite animation means we can keep them.
                // We're just appending them once with infinite loop.
            }, i * 300);
        }
    };
    
    createParticles();
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(11, 12, 16, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.borderBottom = '1px solid rgba(102, 252, 241, 0.2)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.borderBottom = 'none';
        }
    });

    // Image Upload Logic for Wang Lin
    const wanglinUpload = document.getElementById('wanglin-upload');
    const wanglinImg = document.getElementById('wanglin-img');

    if (wanglinUpload && wanglinImg) {
        // Load saved image from localStorage on page load
        const savedImage = localStorage.getItem('wanglin_custom_image');
        if (savedImage) {
            wanglinImg.src = savedImage;
        }

        // Handle file selection
        wanglinUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    wanglinImg.src = dataUrl; // Update image instantly
                    
                    try {
                        localStorage.setItem('wanglin_custom_image', dataUrl); // Save for future reloads
                    } catch (err) {
                        console.log("Image might be too large for localStorage.");
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Image Upload Logic for Li Muyan
    const limuyanUpload = document.getElementById('limuyan-upload');
    const limuyanImg = document.getElementById('limuyan-img');
    const limuyanPlaceholder = document.getElementById('limuyan-placeholder');

    if (limuyanUpload && limuyanImg && limuyanPlaceholder) {
        // Load saved image from localStorage on page load
        const savedLimuyanImage = localStorage.getItem('limuyan_custom_image');
        if (savedLimuyanImage) {
            limuyanImg.src = savedLimuyanImage;
            limuyanImg.style.display = 'block';
            limuyanPlaceholder.style.display = 'none';
        }

        // Handle file selection
        limuyanUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    limuyanImg.src = dataUrl;
                    limuyanImg.style.display = 'block';
                    limuyanPlaceholder.style.display = 'none';
                    
                    try {
                        localStorage.setItem('limuyan_custom_image', dataUrl); // Save for future reloads
                    } catch (err) {
                        console.log("Image might be too large for localStorage.");
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Generic Image Upload Helper for Scenes
    function setupImageUpload(uploadId, imgId, placeholderId, storageKey) {
        const uploadElem = document.getElementById(uploadId);
        const imgElem = document.getElementById(imgId);
        const placeholderElem = document.getElementById(placeholderId);

        if (uploadElem && imgElem && placeholderElem) {
            const savedImage = localStorage.getItem(storageKey);
            if (savedImage) {
                imgElem.src = savedImage;
                imgElem.style.display = 'block';
                placeholderElem.style.display = 'none';
            }

            uploadElem.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const dataUrl = event.target.result;
                        imgElem.src = dataUrl;
                        imgElem.style.display = 'block';
                        placeholderElem.style.display = 'none';
                        try {
                            localStorage.setItem(storageKey, dataUrl);
                        } catch (err) {
                            console.log("Image might be too large for localStorage.");
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    setupImageUpload('scene1-upload', 'scene1-img', 'scene1-placeholder', 'scene1_custom_image');
    setupImageUpload('scene2-upload', 'scene2-img', 'scene2-placeholder', 'scene2_custom_image');
    setupImageUpload('scene3-upload', 'scene3-img', 'scene3-placeholder', 'scene3_custom_image');

    // Hamburger / Sidebar Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarLinksItems = document.querySelectorAll('.sidebar-links a');

    if (hamburger && sidebar && closeSidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.add('active');
            sidebar.classList.add('active');
        });

        closeSidebar.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        });

        // Close menu when clicking a link
        sidebarLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
            });
        });
    }

    // Video Background Upload Logic
    const videoUpload = document.getElementById('video-upload');
    const bgVideo = document.getElementById('bg-video');
    if (videoUpload && bgVideo) {
        videoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                bgVideo.src = fileURL;
            }
        });
    }

    // Master Canvas Effects (Stars, Smoke, Light Rain, Canvas Particles)
    const canvas = document.getElementById('master-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = document.querySelector('.hero').offsetHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero').offsetHeight;
        });

        const stars = [];
        const smoke = [];
        const rain = [];
        const particles = [];

        // Init Stars
        for (let i=0; i<150; i++) {
            stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5, vy: Math.random() * 0.5 + 0.1 });
        }

        // Init Smoke
        for (let i=0; i<6; i++) {
            smoke.push({
                x: Math.random() * width, y: Math.random() * height,
                radius: Math.random() * 200 + 100,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.05 + 0.02
            });
        }

        // Init Light Rain
        for (let i=0; i<25; i++) {
            rain.push({
                x: Math.random() * width, y: Math.random() * height,
                length: Math.random() * 60 + 40,
                vy: Math.random() * 15 + 15,
                alpha: Math.random() * 0.4 + 0.1
            });
        }

        // Init Canvas Particles
        for (let i=0; i<50; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                vx: (Math.random() - 0.5) * 1, vy: Math.random() * -2 - 0.5,
                alpha: Math.random() * 0.8 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw Stars
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            stars.forEach(s => {
                ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); ctx.fill();
                s.y += s.vy;
                if (s.y > height) { s.y = 0; s.x = Math.random() * width; }
            });

            // Draw Smoke
            smoke.forEach(s => {
                const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
                gradient.addColorStop(0, `rgba(102, 252, 241, ${s.alpha})`);
                gradient.addColorStop(1, `rgba(102, 252, 241, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); ctx.fill();
                s.x += s.vx; s.y += s.vy;
                if (s.x < -s.radius) s.x = width + s.radius;
                if (s.x > width + s.radius) s.x = -s.radius;
                if (s.y < -s.radius) s.y = height + s.radius;
                if (s.y > height + s.radius) s.y = -s.radius;
            });

            // Draw Light Rain
            ctx.lineWidth = 1.5;
            rain.forEach(r => {
                const rainGradient = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.length);
                rainGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                rainGradient.addColorStop(1, `rgba(255, 255, 255, ${r.alpha})`);
                ctx.strokeStyle = rainGradient;
                ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y + r.length); ctx.stroke();
                r.y += r.vy;
                if (r.y > height) { r.y = -r.length; r.x = Math.random() * width; }
            });

            // Draw Particles
            particles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 252, 241, ${p.alpha})`;
                ctx.shadowBlur = 15; ctx.shadowColor = '#66fcf1';
                ctx.fill();
                ctx.shadowBlur = 0;
                p.x += p.vx; p.y += p.vy;
                if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
});
