/* ==========================================================================
   Aashik Solanki Portfolio — Interactive Logic Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Typewriter Animation Effect
     ------------------------------------------------------------------------ */
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'AI & Machine Learning Developer',
    'PyTorch & Deep Learning Builder',
    'Full-Stack Web Enthusiast',
    'Student @ Sem 5 Marwadi Univ'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  /* ------------------------------------------------------------------------
     2. Dark / Light Theme Toggle & Persistence
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info');
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#0284c7';
    }
  }

  /* ------------------------------------------------------------------------
     3. Scroll Progress Indicator & Active Navigation Highlight
     ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Back to top button visibility
    if (winScroll > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Nav active link
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (winScroll >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------------
     4. Mobile Navigation Menu Toggle
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. Interactive CLI Terminal System
     ------------------------------------------------------------------------ */
  const terminalInput = document.getElementById('terminal-input');
  const terminalLog = document.getElementById('terminal-log');
  const terminalBody = document.getElementById('terminal-body');
  const chipBtns = document.querySelectorAll('.chip-btn[data-cmd]');

  const commandDatabase = {
    help: `Available commands:
  • <span style="color: var(--accent-cyan);">whoami</span>      - Brief summary about Aashik
  • <span style="color: var(--accent-cyan);">skills</span>      - Technical stack & proficiencies
  • <span style="color: var(--accent-cyan);">projects</span>    - List featured AI/ML projects
  • <span style="color: var(--accent-cyan);">contact</span>     - View contact methods
  • <span style="color: var(--accent-cyan);">matrix</span>      - Run a fun terminal ASCII visualizer
  • <span style="color: var(--accent-cyan);">date</span>        - Current server timestamp
  • <span style="color: var(--accent-cyan);">clear</span>       - Clear terminal screen`,

    whoami: `<span style="color: #fff; font-weight: 600;">Aashik Solanki</span>
AI & Machine Learning Student | Developer
Location: India
Current Status: Semester 5 IMS Student @ Marwadi University (MU).
Passionate about building deep neural networks, computer vision applications, and intelligent web tools.`,

    skills: `<span style="color: var(--accent-teal); font-weight: 600;">Primary Tech Stack:</span>
  • Languages: Python (Advanced), JavaScript (ES6+), SQL, HTML/CSS
  • AI / ML: PyTorch, Scikit-Learn, Pandas, NumPy, HuggingFace Transformers
  • Computer Vision: OpenCV, CNN Architectures (ResNet, MNIST Model)
  • Web & Tools: Flask, REST APIs, Git, GitHub, Jupyter, VS Code`,

    projects: `<span style="color: var(--accent-amber); font-weight: 600;">Featured Projects:</span>
  1. <span style="color: #fff;">Handwritten Digit Classifier</span> [PyTorch, CNN, 99.1% Acc]
  2. <span style="color: #fff;">Movie Recommendation Engine</span> [Collaborative Filtering, 100k Ratings]
  3. <span style="color: #fff;">Sentiment Analysis on Product Reviews</span> [DistilBERT Transformer]`,

    contact: `Email: <a href="mailto:aashiksolanki@example.com" style="color: var(--accent-cyan); text-decoration: underline;">aashiksolanki@example.com</a>
GitHub: <a href="https://github.com/aashiksolanki" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">github.com/aashiksolanki</a>
LinkedIn: <a href="https://linkedin.com/in/aashiksolanki" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">linkedin.com/in/aashiksolanki</a>`,

    matrix: `<span style="color: #10b981;">
01000001 01000001 01010011 01001000 01001001 01001011
Wake up, Neo... The Matrix has you.
[System initialized: Aashik Neural Subsystem Active]
</span>`
  };

  function executeCommand(cmdStr) {
    const cleanCmd = cmdStr.trim().toLowerCase();
    
    // Create prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="cmd-prompt">aashik@portfolio:~$</span><span class="cmd-text">${escapeHtml(cmdStr)}</span>`;
    terminalLog.appendChild(promptLine);

    if (cleanCmd === 'clear') {
      terminalLog.innerHTML = '';
    } else if (cleanCmd === '') {
      // Do nothing
    } else if (commandDatabase[cleanCmd]) {
      const outputLine = document.createElement('div');
      outputLine.className = 'terminal-output';
      outputLine.innerHTML = commandDatabase[cleanCmd];
      terminalLog.appendChild(outputLine);
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'terminal-output';
      errorLine.style.borderColor = 'var(--accent-pink)';
      errorLine.innerHTML = `<span style="color: #ef4444;">zsh: command not found: ${escapeHtml(cleanCmd)}</span>. Type <span style="color: var(--accent-amber);">'help'</span> for a list of valid commands.`;
      terminalLog.appendChild(errorLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value;
        executeCommand(value);
        terminalInput.value = '';
      }
    });
  }

  chipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ------------------------------------------------------------------------
     6. Projects Filter & Real-Time Search
     ------------------------------------------------------------------------ */
  const projectSearch = document.getElementById('project-search');
  const filterTabs = document.querySelectorAll('.filter-tabs .tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  let activeFilter = 'all';
  let searchQuery = '';

  function filterProjects() {
    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const tags = card.getAttribute('data-tags');
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const desc = card.querySelector('.project-desc').textContent.toLowerCase();

      const matchesFilter = activeFilter === 'all' || category.includes(activeFilter);
      const matchesSearch = searchQuery === '' || 
        title.includes(searchQuery) || 
        desc.includes(searchQuery) || 
        tags.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      filterProjects();
    });
  });

  if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProjects();
    });
  }

  /* ------------------------------------------------------------------------
     7. Interactive Project Modals & Mini-Demos Controller
     ------------------------------------------------------------------------ */
  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const openDemoBtns = document.querySelectorAll('.open-demo-btn');

  const projectDetailsMap = {
    'digit-classifier': {
      category: 'Computer Vision / PyTorch CNN',
      title: 'Handwritten Digit Classifier (MNIST)',
      desc: 'A custom Convolutional Neural Network trained using PyTorch on 60,000 MNIST training images. Reached 99.1% accuracy with data augmentation and dropout regularization.',
      architecture: [
        'Input Layer (28x28 grayscale image)',
        'Conv2D (32 filters, 3x3 kernel) + ReLU + BatchNorm',
        'MaxPool2D (2x2) + Dropout(0.25)',
        'Conv2D (64 filters, 3x3 kernel) + ReLU',
        'Dense Layer (128 units) + Dropout(0.5)',
        'Softmax Output Layer (10 classes: 0 - 9)'
      ],
      interactiveDemoType: 'digit-canvas',
      codeSnippet: `import torch
import torch.nn as nn

class MNISTConvNet(nn.Module):
    def __init__(self):
        super(MNISTConvNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.25)
        
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = self.dropout(torch.relu(self.fc1(x)))
        return self.fc2(x)`
    },

    'movie-recommender': {
      category: 'Machine Learning / Recommender System',
      title: 'Movie Recommendation Engine',
      desc: 'Matrix factorization recommendation system built over the MovieLens dataset (100,000+ ratings). Uses Singular Value Decomposition (SVD) with Cosine Similarity for personalized item suggestions.',
      architecture: [
        'Data Ingestion: 100k MovieLens ratings CSV dataset',
        'User-Item Rating Matrix Construction with Scipy Sparse Matrix',
        'Cosine Similarity calculation across vector spaces',
        'Cold-Start Fallback: Popularity-weighted Bayesian mean rating'
      ],
      interactiveDemoType: 'recommender-slider',
      codeSnippet: `from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def recommend_movies(user_id, rating_matrix, top_n=5):
    # Compute similarity between target user and all users
    user_vec = rating_matrix[user_id].reshape(1, -1)
    similarities = cosine_similarity(user_vec, rating_matrix)[0]
    
    # Weighted average ratings of top similar users
    similar_user_indices = np.argsort(similarities)[::-1][1:11]
    recommendations = rating_matrix[similar_user_indices].mean(axis=0)
    return np.argsort(recommendations)[::-1][:top_n]`
    },

    'sentiment-analyzer': {
      category: 'NLP / HuggingFace Transformers',
      title: 'Sentiment Analysis on Product Reviews',
      desc: 'Fine-tuned DistilBERT transformer for binary & multi-class review sentiment classification. Deployed with real-time text analysis dashboard.',
      architecture: [
        'Base Model: DistilBERT (Uncased pretrained transformer)',
        'Tokenization: WordPiece Subword Tokenizer',
        'Fine-tuning: AdamW Optimizer with Cosine Learning Rate Decay',
        'Performance: 94.2% test macro F1-score'
      ],
      interactiveDemoType: 'sentiment-tester',
      codeSnippet: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.softmax(logits, dim=1).numpy()[0]
    return {"Negative": float(probs[0]), "Positive": float(probs[1])}`
    }
  };

  openDemoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsMap[projKey];

      if (!data) return;

      let demoHTML = '';

      if (data.interactiveDemoType === 'digit-canvas') {
        demoHTML = `
          <div class="demo-box">
            <div class="demo-title"><i class="fa-solid fa-paintbrush"></i> Live Interactive Canvas — Draw a Digit (0-9)</div>
            <canvas id="digitCanvas" width="140" height="140" class="digit-canvas"></canvas>
            <div class="demo-controls">
              <button id="predict-digit-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-wand-magic-sparkles"></i> Predict Digit</button>
              <button id="clear-digit-btn" class="btn btn-outline btn-sm"><i class="fa-solid fa-eraser"></i> Clear Canvas</button>
            </div>
            <div id="digit-result" class="demo-result">Draw a digit above and click Predict!</div>
          </div>
        `;
      } else if (data.interactiveDemoType === 'recommender-slider') {
        demoHTML = `
          <div class="demo-box">
            <div class="demo-title"><i class="fa-solid fa-film"></i> Interactive Recommendation Simulator</div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Select Preferred Genre:</label>
            <select id="genre-select" class="form-input" style="max-width: 300px; margin: 0 auto 1rem;">
              <option value="sci-fi">Sci-Fi / AI</option>
              <option value="action">Action / Thriller</option>
              <option value="drama">Drama / Mystery</option>
            </select>
            <button id="recommend-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-sparkles"></i> Generate Top Recommendations</button>
            <div id="recommender-result" class="demo-result" style="text-align: left; margin-top: 1rem; padding: 0.8rem; background: var(--bg-secondary); border-radius: 8px;">
              Click button above to test matrix similarity!
            </div>
          </div>
        `;
      } else if (data.interactiveDemoType === 'sentiment-tester') {
        demoHTML = `
          <div class="demo-box">
            <div class="demo-title"><i class="fa-solid fa-comments"></i> Live Sentiment Transformer Tester</div>
            <input type="text" id="sentiment-input" class="form-input" placeholder="Type a review (e.g., This model performance is incredibly accurate!)" style="margin-bottom: 1rem;" />
            <button id="analyze-sentiment-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-brain"></i> Classify Sentiment</button>
            <div id="sentiment-result" class="demo-result" style="margin-top: 1rem;">
              Enter text above to compute confidence score!
            </div>
          </div>
        `;
      }

      modalContent.innerHTML = `
        <div class="modal-header-tag">${data.category}</div>
        <h2 class="modal-title">${data.title}</h2>
        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.2rem;">${data.desc}</p>
        
        ${demoHTML}

        <h4 style="margin: 1.5rem 0 0.6rem; color: var(--accent-cyan); font-family: var(--font-mono);">System Architecture &amp; Pipeline:</h4>
        <ul style="list-style: square; padding-left: 1.2rem; color: var(--text-muted); line-height: 1.7; font-size: 0.925rem;">
          ${data.architecture.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="margin: 1.5rem 0 0.6rem; color: var(--accent-teal); font-family: var(--font-mono);">Python Model Code Snippet:</h4>
        <pre style="background: #080c14; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #a7f3d0;"><code>${escapeHtml(data.codeSnippet)}</code></pre>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Initialize canvas if digit classifier modal opened
      if (data.interactiveDemoType === 'digit-canvas') {
        initDigitCanvas();
      } else if (data.interactiveDemoType === 'recommender-slider') {
        initRecommenderSimulator();
      } else if (data.interactiveDemoType === 'sentiment-tester') {
        initSentimentSimulator();
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     7b. Canvas Drawing & Mini Demo Calculators
     ------------------------------------------------------------------------ */
  function initDigitCanvas() {
    const canvas = document.getElementById('digitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    let drawing = false;

    function startDrawing(e) {
      drawing = true;
      draw(e);
    }

    function stopDrawing() {
      drawing = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);

    document.getElementById('clear-digit-btn').addEventListener('click', () => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      document.getElementById('digit-result').innerHTML = 'Canvas cleared. Draw a new digit!';
    });

    document.getElementById('predict-digit-btn').addEventListener('click', () => {
      // Simulate Neural Network Prediction
      const randomDigit = Math.floor(Math.random() * 10);
      const confidence = (94.5 + Math.random() * 5).toFixed(1);

      document.getElementById('digit-result').innerHTML = `
        Predicted Digit: <strong style="color: var(--accent-teal); font-size: 1.4rem;">${randomDigit}</strong> 
        <span style="font-size: 0.9rem; color: var(--text-muted);">(Confidence: ${confidence}%)</span>
      `;
    });
  }

  function initRecommenderSimulator() {
    const btn = document.getElementById('recommend-btn');
    const select = document.getElementById('genre-select');
    const result = document.getElementById('recommender-result');

    const movieDB = {
      'sci-fi': [
        '1. Interstellar (Cosine Similarity: 0.98)',
        '2. Inception (Cosine Similarity: 0.95)',
        '3. Blade Runner 2049 (Cosine Similarity: 0.92)'
      ],
      'action': [
        '1. The Dark Knight (Cosine Similarity: 0.97)',
        '2. Mad Max: Fury Road (Cosine Similarity: 0.94)',
        '3. Matrix (Cosine Similarity: 0.91)'
      ],
      'drama': [
        '1. The Shawshank Redemption (Cosine Similarity: 0.99)',
        '2. Oppenheimer (Cosine Similarity: 0.96)',
        '3. Good Will Hunting (Cosine Similarity: 0.93)'
      ]
    };

    btn.addEventListener('click', () => {
      const genre = select.value;
      const list = movieDB[genre] || [];
      result.innerHTML = `
        <strong style="color: var(--accent-cyan);">Top Matched Recommendations:</strong><br>
        ${list.map(m => `<div style="margin-top: 0.3rem;">• ${m}</div>`).join('')}
      `;
    });
  }

  function initSentimentSimulator() {
    const btn = document.getElementById('analyze-sentiment-btn');
    const input = document.getElementById('sentiment-input');
    const result = document.getElementById('sentiment-result');

    btn.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) {
        result.innerHTML = '<span style="color: var(--accent-pink);">Please type a review phrase first!</span>';
        return;
      }

      const isPositive = !text.toLowerCase().includes('bad') && !text.toLowerCase().includes('poor') && !text.toLowerCase().includes('slow') && !text.toLowerCase().includes('hate');
      const score = isPositive ? (88 + Math.random() * 11).toFixed(1) : (12 + Math.random() * 15).toFixed(1);
      const label = isPositive ? 'POSITIVE 😄' : 'NEGATIVE 🙁';
      const labelColor = isPositive ? 'var(--accent-teal)' : 'var(--accent-pink)';

      result.innerHTML = `
        Sentiment: <strong style="color: ${labelColor};">${label}</strong> | 
        Positivity Score: <strong>${score}%</strong>
      `;
    });
  }

  /* ------------------------------------------------------------------------
     8. Skill Bar Animate on Intersection
     ------------------------------------------------------------------------ */
  const skillFills = document.querySelectorAll('.skill-fill');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach((fill) => skillObserver.observe(fill));

  /* ------------------------------------------------------------------------
     9. Contact Form Handling & Copy Email
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text').textContent;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';
        contactForm.reset();

        showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
      }, 1200);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast('Email address copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Address: ' + emailText, 'info');
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. Toast Notification System
     ------------------------------------------------------------------------ */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '<i class="fa-solid fa-circle-check" style="color: var(--accent-teal);"></i>';
    if (type === 'info') icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent-cyan);"></i>';

    toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

});
