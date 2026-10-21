document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Hamburger Menu ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Modal Handler ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');

    function openCenterModal(html) {
        modalContent.innerHTML = html;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // --- Sign In & Get Started Buttons ---
    const signInBtn = document.getElementById('signInBtn');
    const mobileSignIn = document.getElementById('mobileSignIn');
    const getStartedNavBtn = document.getElementById('getStartedNavBtn');
    const mobileGetStarted = document.getElementById('mobileGetStarted');

    function handleAuthModal(isSignUp = false) {
        const title = isSignUp ? 'Create your Nexora Account' : 'Welcome Back to Nexora';
        const actionText = isSignUp ? 'Create Account' : 'Sign In';
        const switchText = isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign up";
        
        openCenterModal(`
            <div class="modal-body-content">
                <h3>${title}</h3>
                <p>Enter your credentials to access your sacred workspace (Demo simulation).</p>
                <form id="authForm" style="display: flex; flex-direction: column; gap: 1rem;">
                    <input type="email" placeholder="Work Email" required style="padding: 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(251,191,36,0.2); border-radius: 6px; color: #fff; font-size: 0.95rem;">
                    <input type="password" placeholder="Password" required style="padding: 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(251,191,36,0.2); border-radius: 6px; color: #fff; font-size: 0.95rem;">
                    <button type="submit" class="btn-primary btn-full">${actionText}</button>
                </form>
                <div style="margin-top: 1rem; text-align: center;">
                    <a href="#" id="switchAuth" style="color: #f59e0b; font-size: 0.85rem; text-decoration: none;">${switchText}</a>
                </div>
            </div>
        `);

        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showNotification(isSignUp ? 'Account created successfully! May Maa Durga guide your creations.' : 'Signed in successfully! Welcome to your divine workspace.');
        });

        document.getElementById('switchAuth').addEventListener('click', (e) => {
            e.preventDefault();
            handleAuthModal(!isSignUp);
        });
    }

    signInBtn.addEventListener('click', () => handleAuthModal(false));
    mobileSignIn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        handleAuthModal(false);
    });

    getStartedNavBtn.addEventListener('click', () => handleAuthModal(true));
    mobileGetStarted.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        handleAuthModal(true);
    });

    // --- Divine Blessing Button ---
    const blessingBtn = document.getElementById('blessingBtn');
    if (blessingBtn) {
        blessingBtn.addEventListener('click', () => {
            openCenterModal(`
                <div class="modal-body-content" style="text-align: center;">
                    <h3 style="color: #fde68a;">🔱 Divine Blessing of Shakti 🔱</h3>
                    <p style="font-size: 1.1rem; line-height: 1.7; color: #fff; margin: 1.5rem 0;">
                        &ldquo;Om Aim Hreem Kleem Chamundayai Vichche&rdquo;<br><br>
                        May the divine power of Maa Durga dispel all obstacles in your path, illuminate your intellect, and shower your projects with infinite success and harmony.
                    </p>
                    <button class="btn-primary btn-full" id="closeBlessing">Receive with Gratitude 🙏</button>
                </div>
            `);
            document.getElementById('closeBlessing').addEventListener('click', () => {
                closeModal();
                showNotification('Divine blessings received! Have an auspicious day.');
            });
        });
    }

    // --- Interactive AI Demo Simulator ---
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const outputBody = document.getElementById('outputBody');
    const outputStatus = document.getElementById('outputStatus');
    const chips = document.querySelectorAll('.chip');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            promptInput.value = chip.getAttribute('data-prompt');
        });
    });

    const mockResponses = [
        {
            match: ['blessing', 'durga', 'new venture'],
            response: "🔱 **Divine Wisdom & Blessing:**\n\nAs you embark upon this new venture, may Maa Durga grant you the 10 arms of resilience: courage in challenge, wisdom in decision, clarity in vision, and boundless compassion for all. Jai Maa Durga! ✨"
        },
        {
            match: ['tweet', 'launch', 'product'],
            response: "🚀 The future of intelligence is here. Meet Nexora AI v2.5—built with divine precision to help you create, code, and innovate at the speed of thought. Stop dreaming, start building! ✨ #AI #TechLaunch #NexoraAI #MaaDurga"
        },
        {
            match: ['async', 'javascript', 'js'],
            response: "Asynchronous JavaScript allows your code to perform long-running network requests or calculations without freezing the main user interface. Using `async/await` makes asynchronous code look and behave more like synchronous code, improving readability and error handling."
        },
        {
            match: ['startup', 'growth', 'b2b', 'hacks'],
            response: "1. **Product-Led SEO:** Publish interactive free tools (like calculators or sandboxes) that rank on Google and naturally convert traffic.\n2. **Micro-Communities:** Build a private Discord or Slack for early beta users to create high-advocacy product champions.\n3. **Frictionless Onboarding:** Remove credit card requirements for trial accounts to maximize initial developer adoption."
        }
    ];

    generateBtn.addEventListener('click', () => {
        const query = promptInput.value.trim();
        if (!query) {
            outputBody.innerHTML = `<p style="color: #f87171;">Please enter a prompt or select an example chip first.</p>`;
            return;
        }

        // Loading state
        outputStatus.textContent = 'Generating...';
        outputStatus.style.background = 'rgba(245, 158, 11, 0.2)';
        outputStatus.style.color = '#fde68a';

        outputBody.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <span>Nexora AI is processing your request with divine clarity...</span>
            </div>
        `;

        setTimeout(() => {
            let matchedAnswer = "✨ **Nexora AI Simulation Output:**\n\n" +
                `You asked: \"${query}\"\n\n` +
                "This is a simulated demo response. In the full production environment, Nexora's neural architecture processes this prompt against custom context windows with sub-150ms inference latency.";

            const lowerQuery = query.toLowerCase();
            for (const item of mockResponses) {
                if (item.match.some(keyword => lowerQuery.includes(keyword))) {
                    matchedAnswer = "✨ **Nexora AI Simulation Output:**\n\n" + item.response;
                    break;
                }
            }

            outputStatus.textContent = 'Completed (138ms)';
            outputStatus.style.background = 'rgba(52, 211, 153, 0.15)';
            outputStatus.style.color = '#34d399';

            // Format newlines
            const formattedHTML = matchedAnswer.replace(/\n/g, '<br>');
            outputBody.innerHTML = `<div style="line-height: 1.7;">${formattedHTML}</div>`;
        }, 1200);
    });

    // --- Pricing Plan Selection ---
    const planButtons = document.querySelectorAll('.plan-btn');

    planButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.getAttribute('data-plan');
            openCenterModal(`
                <div class="modal-body-content">
                    <h3>Confirm ${planName} Offering</h3>
                    <p>You have selected the <strong>${planName}</strong> plan. This is a frontend simulation. No actual payment will be processed.</p>
                    <button id="confirmPlanBtn" class="btn-primary btn-full">Proceed to Checkout Simulator</button>
                </div>
            `);

            document.getElementById('confirmPlanBtn').addEventListener('click', () => {
                closeModal();
                showNotification(`Successfully subscribed to the ${planName} plan! May prosperity follow you.`);
            });
        });
    });

    // --- Newsletter Form Validation ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMsg = document.getElementById('newsletterMsg');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        
        if (email && email.includes('@') && email.includes('.')) {
            newsletterMsg.style.color = '#34d399';
            newsletterMsg.textContent = 'Thank you for subscribing! Check your inbox for sacred updates.';
            newsletterEmail.value = '';
        } else {
            newsletterMsg.style.color = '#f87171';
            newsletterMsg.textContent = 'Please enter a valid email address.';
        }
    });

    // --- Simple Notification Toast ---
    function showNotification(message) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '2rem';
        toast.style.right = '2rem';
        toast.style.background = '#12090d';
        toast.style.color = '#fef3c7';
        toast.style.border = '1px solid #f59e0b';
        toast.style.padding = '1rem 1.5rem';
        toast.style.borderRadius = '10px';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
        toast.style.zIndex = '3000';
        toast.style.fontSize = '0.95rem';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '0.75rem';
        toast.innerHTML = `<span>🔱</span> <span>${message}</span>`;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }
});
