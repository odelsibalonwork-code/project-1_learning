(() => {
  'use strict';

  const EMAIL = 'odelsibalon34@gmail.com';

  function initializePortfolio() {
    const menuToggle = document.querySelector('#menu-toggle');
    const mainNav = document.querySelector('#main-nav');

    function closeMenu() {
      if (!menuToggle || !mainNav) return;
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    }

    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        mainNav.classList.toggle('is-open', !isOpen);
      });
      mainNav.addEventListener('click', event => {
        if (event.target.closest('a')) closeMenu();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu();
          menuToggle.focus();
        }
      });
    }

    const filterButtons = [...document.querySelectorAll('[data-filter]')];
    const projectCards = [...document.querySelectorAll('article[data-category]')];
    const filterStatus = document.querySelector('#filter-status');
    const showMore = document.querySelector('#show-more');
    let activeFilter = 'all';
    let showAllProjects = false;

    function renderProjects() {
      const matchingCards = projectCards.filter(card => activeFilter === 'all' || card.dataset.category === activeFilter);
      const visibleCards = new Set(showAllProjects ? matchingCards : matchingCards.slice(0, 6));
      projectCards.forEach(card => {
        card.hidden = !visibleCards.has(card);
      });
      filterButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
      });
      const projectLabel = activeFilter === 'video' ? 'videos' : activeFilter === 'graphics' ? 'graphics' : 'projects';
      if (filterStatus) {
        filterStatus.textContent = `Showing ${visibleCards.size} of ${matchingCards.length} ${projectLabel}.`;
      }
      if (showMore) {
        showMore.hidden = visibleCards.size >= matchingCards.length;
        showMore.textContent = `View all ${matchingCards.length} ${projectLabel}`;
      }
      return matchingCards;
    }

    function applyFilter(filter) {
      activeFilter = filter;
      showAllProjects = false;
      renderProjects();
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
    });
    showMore?.addEventListener('click', () => {
      showAllProjects = true;
      const matchingCards = renderProjects();
      matchingCards[6]?.querySelector('button, a')?.focus({ preventScroll: true });
    });
    if (projectCards.length) {
      const initialFilter = filterButtons.find(button => button.getAttribute('aria-pressed') === 'true');
      applyFilter(initialFilter?.dataset.filter || 'all');
    }

    const projectDialog = document.querySelector('#project-dialog');
    const projectContent = document.querySelector('#project-content');
    let projectTrigger = null;
    const projects = new Map(
      (Array.isArray(window.VOHN_PROJECTS) ? window.VOHN_PROJECTS : [])
        .map(project => [project.id, project]),
    );

    function pauseProjectMedia() {
      projectContent?.querySelectorAll('video, audio').forEach(media => media.pause());
    }

    function openProject(key, trigger) {
      const project = projects.get(key);
      if (!project || !projectDialog || !projectContent) return;
      pauseProjectMedia();
      projectContent.replaceChildren();
      projectTrigger = trigger;

      const eyebrow = document.createElement('p');
      eyebrow.className = 'project-dialog-eyebrow';
      eyebrow.textContent = project.role || project.group || (project.category === 'video' ? 'Video editing' : 'Graphic design');
      const heading = document.createElement('h2');
      heading.id = 'project-dialog-title';
      heading.textContent = project.title;
      const description = document.createElement('p');
      description.id = 'project-dialog-description';
      description.className = 'project-dialog-description';
      description.textContent = project.description || '';

      let media;
      if (project.category === 'video' && project.src) {
        media = document.createElement('video');
        media.src = project.src;
        if (project.poster) media.poster = project.poster;
        media.controls = true;
        media.preload = 'metadata';
        media.playsInline = true;
        media.setAttribute('aria-label', project.title);
        media.textContent = 'Your browser does not support this video.';
      } else if (project.category === 'video' && project.embed) {
        media = document.createElement('iframe');
        media.src = project.embed;
        media.title = `${project.title} — video preview`;
        media.allow = 'autoplay; fullscreen; picture-in-picture';
        media.allowFullscreen = true;
        media.referrerPolicy = 'strict-origin-when-cross-origin';
      } else {
        media = document.createElement('img');
        media.src = project.src;
        media.alt = project.alt || project.title;
      }
      media.className = 'project-dialog-media';
      projectContent.append(eyebrow, heading, description, media);
      if (project.external) {
        const previewLink = document.createElement('a');
        previewLink.className = 'project-preview-link';
        previewLink.href = project.external;
        previewLink.target = '_blank';
        previewLink.rel = 'noopener noreferrer';
        previewLink.textContent = 'Open full preview ↗';
        projectContent.append(previewLink);
      }
      projectDialog.setAttribute('aria-labelledby', heading.id);
      projectDialog.setAttribute('aria-describedby', description.id);
      projectDialog.showModal();
      projectDialog.querySelector('[data-close-dialog]')?.focus();
    }

    document.querySelectorAll('[data-project]').forEach(trigger => {
      trigger.addEventListener('click', () => openProject(trigger.dataset.project, trigger));
    });

    if (projectDialog) {
      projectDialog.querySelectorAll('[data-close-dialog]').forEach(button => {
        button.addEventListener('click', () => projectDialog.close());
      });
      projectDialog.addEventListener('click', event => {
        if (event.target !== projectDialog) return;
        const bounds = projectDialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) {
          projectDialog.close();
        }
      });
      projectDialog.addEventListener('close', () => {
        pauseProjectMedia();
        projectContent?.replaceChildren();
        projectTrigger?.focus({ preventScroll: true });
        projectTrigger = null;
      });
    }

    const projectForm = document.querySelector('#project-form');
    const formStatus = document.querySelector('#form-status');
    if (projectForm) {
      projectForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!projectForm.reportValidity()) return;
        const formData = new FormData(projectForm);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const service = String(formData.get('service') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const subject = `Project inquiry${service ? `: ${service}` : ''}${name ? ` — ${name}` : ''}`;
        const body = [
          'Hi Vohn Creative,',
          '',
          message,
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Service: ${service || 'Let’s discuss'}`,
        ].join('\n');
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        if (formStatus) formStatus.textContent = 'Your email draft is ready. Send it from your email app.';
      });
    }

    const copyEmail = document.querySelector('#copy-email');
    const copyStatus = document.querySelector('#copy-status');
    let copyFallback = null;

    function selectEmailFallback() {
      if (!copyFallback) {
        copyFallback = document.createElement('input');
        copyFallback.type = 'text';
        copyFallback.readOnly = true;
        copyFallback.value = EMAIL;
        copyFallback.className = 'copy-email-fallback';
        copyFallback.setAttribute('aria-label', 'Email address to copy');
        copyEmail.insertAdjacentElement('afterend', copyFallback);
      }
      copyFallback.hidden = false;
      copyFallback.focus();
      copyFallback.select();
      copyFallback.setSelectionRange(0, EMAIL.length);
      if (copyStatus) copyStatus.textContent = 'Select and copy this email address.';
    }

    copyEmail?.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.writeText) {
          selectEmailFallback();
          return;
        }
        await navigator.clipboard.writeText(EMAIL);
        if (copyFallback) copyFallback.hidden = true;
        if (copyStatus) copyStatus.textContent = 'Email address copied.';
      } catch {
        selectEmailFallback();
      }
    });

    const progress = document.querySelector('#page-progress');
    const heroStage = document.querySelector('#hero-stage');
    const heroVisual = document.querySelector('#hero-visual');
    const motionToggle = document.querySelector('#motion-toggle');
    if (progress || heroStage || motionToggle) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let motionPaused = document.body.classList.contains('motion-paused');
      let framePending = false;
      let hasScrolled = false;
      let heroFilm = document.querySelector('#hero-film');
      let filmRequested = false;
      let filmFailed = false;
      const useMobileFilm = window.matchMedia('(max-width: 700px)').matches;
      const filmSource = useMobileFilm ? 'assets/hero-scrub-mobile.mp4' : 'assets/hero-scrub.mp4';
      const filmPoster = useMobileFilm ? 'assets/hero-mobile-poster.jpg' : 'assets/hero-poster.jpg';
      if (heroVisual && !heroFilm) {
        heroFilm = document.createElement('video');
        heroFilm.id = 'hero-film';
        heroFilm.className = 'hero-film';
        heroFilm.poster = filmPoster;
        heroFilm.preload = 'none';
        heroFilm.muted = true;
        heroFilm.defaultMuted = true;
        heroFilm.playsInline = true;
        heroFilm.tabIndex = -1;
        heroFilm.setAttribute('aria-hidden', 'true');
        heroVisual.append(heroFilm);
      }
      if (heroFilm) {
        heroFilm.poster = filmPoster;
        heroFilm.muted = true;
        heroFilm.defaultMuted = true;
        heroFilm.playsInline = true;
      }
      const updateProgress = () => {
        framePending = false;
        const documentElement = document.documentElement;
        const scrollable = Math.max(0, documentElement.scrollHeight - documentElement.clientHeight);
        const fraction = scrollable ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        if (progress) {
          progress.style.transition = reducedMotion.matches ? 'none' : '';
          progress.style.transform = `scaleX(${fraction})`;
        }
        if (heroStage) {
          const bounds = heroStage.getBoundingClientRect();
          const journeyDistance = Math.max(1, bounds.height - window.innerHeight);
          const scrollJourney = Math.min(1, Math.max(0, -bounds.top / journeyDistance));
          const isStatic = reducedMotion.matches || motionPaused;
          const journey = isStatic ? 0 : scrollJourney;
          heroStage.style.setProperty('--journey', String(journey));
          if (heroFilm && !filmFailed && !isStatic) {
            if (!filmRequested && hasScrolled && journey > 0) {
              filmRequested = true;
              heroFilm.preload = 'metadata';
              heroFilm.src = filmSource;
              heroFilm.load();
            }
            if (filmRequested && heroFilm.readyState >= 1 && Number.isFinite(heroFilm.duration) && !heroFilm.seeking) {
              const frameTime = Math.min(Math.max(0, heroFilm.duration - 0.05), journey * heroFilm.duration);
              if (Math.abs(heroFilm.currentTime - frameTime) > 0.04) {
                try {
                  heroFilm.currentTime = frameTime;
                } catch {
                  // Keep the poster if this browser cannot seek the decorative film.
                }
              }
            }
          }
        }
      };
      const scheduleProgress = () => {
        if (!framePending) {
          framePending = true;
          window.requestAnimationFrame(updateProgress);
        }
      };
      window.addEventListener('scroll', () => {
        hasScrolled = true;
        scheduleProgress();
      }, { passive: true });
      window.addEventListener('resize', scheduleProgress, { passive: true });
      window.addEventListener('load', scheduleProgress, { once: true });
      reducedMotion.addEventListener('change', scheduleProgress);
      if (heroFilm) {
        heroFilm.addEventListener('loadedmetadata', scheduleProgress);
        heroFilm.addEventListener('seeked', scheduleProgress);
        heroFilm.addEventListener('error', () => {
          filmFailed = true;
          heroFilm.removeAttribute('src');
          heroFilm.load();
        }, { once: true });
      }
      if (motionToggle) {
        const updateMotionButton = () => {
          document.body.classList.toggle('motion-paused', motionPaused);
          motionToggle.setAttribute('aria-pressed', String(motionPaused));
          motionToggle.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
          scheduleProgress();
        };
        motionToggle.addEventListener('click', () => {
          motionPaused = !motionPaused;
          updateMotionButton();
        });
        updateMotionButton();
      }
      scheduleProgress();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
  } else {
    initializePortfolio();
  }
})();
