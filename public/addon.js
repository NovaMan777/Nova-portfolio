    document.addEventListener('DOMContentLoaded', () => {
      const text = document.querySelector('.glitch-text');
      const container = document.querySelector('.glitch-container');
      
      container.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        text.style.textShadow = `
          ${0.05 * x}em 0 0 rgba(255, 0, 0, 0.75),
          ${-0.025 - 0.05 * y}em ${-0.05 * x}em 0 rgba(0, 255, 0, 0.75),
          ${0.025 * y}em ${0.05 * x}em 0 rgba(0, 0, 255, 0.75)
        `;
        
        if (Math.random() > 0.95) {
          text.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`;
          setTimeout(() => {
            text.style.transform = 'translate(0, 0)';
          }, 100);
        }
      });
      
      setInterval(() => {
        if (Math.random() > 0.8) {
          text.style.opacity = Math.random() * 0.9 + 0.1;
          setTimeout(() => {
            text.style.opacity = 1;
          }, 50);
        }
      }, 500);
      
      text.addEventListener('click', () => {
        text.classList.add('intense-glitch');
        
        const originalText = text.getAttribute('data-text');
        const chars = originalText.split('');
        
        let iterations = 0;
        
        const interval = setInterval(() => {
          text.innerText = chars.map((char, index) => {
            if (index < iterations || char === ' ') {
              return originalText[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          }).join('');
          
          iterations += 1/3;
          
          if (iterations >= originalText.length) {
            clearInterval(interval);
            text.innerText = originalText;
            setTimeout(() => {
              text.classList.remove('intense-glitch');
            }, 1000);
          }
        }, 50);
      });
      
      function createGlitchElement() {
        const glitchElem = document.createElement('div');
        glitchElem.classList.add('corrupt-text');
        
        const xPos = Math.random() * 100 - 50;
        const yPos = Math.random() * 100 - 50;
        
        glitchElem.style.transform = `translate(${xPos}px, ${yPos}px)`;
        
        const type = Math.floor(Math.random() * 3);
        let content = '';
        
        if (type === 0) {
          for (let i = 0; i < 8; i++) {
            content += Math.random() > 0.5 ? '1' : '0';
          }
        } else if (type === 1) {
          for (let i = 0; i < 4; i++) {
            content += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
          }
        } else {
          for (let i = 0; i < 4; i++) {
            content += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
          }
        }
        
        glitchElem.innerText = content;
        container.appendChild(glitchElem);
        
        setTimeout(() => {
          glitchElem.remove();
        }, Math.random() * 1000 + 200);
      }
      
      setInterval(() => {
        if (Math.random() > 0.7) {
          createGlitchElement();
        }
      }, 500);
    });