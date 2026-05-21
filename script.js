document.addEventListener('DOMContentLoaded', () => {
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

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }
});
