(() => {
  const galleries = [...document.querySelectorAll('.gallery')];
  if (!galleries.length || typeof HTMLDialogElement === 'undefined') return;

  const viewer = document.createElement('dialog');
  viewer.className = 'image-viewer';
  viewer.setAttribute('aria-label', 'Image gallery');
  viewer.innerHTML = `
    <button class="viewer-close" type="button" aria-label="Close image viewer">×</button>
    <button class="viewer-prev" type="button" aria-label="Previous image">‹</button>
    <div class="viewer-stage"><figure><img alt="" draggable="false"><figcaption></figcaption></figure></div>
    <button class="viewer-next" type="button" aria-label="Next image">›</button>
    <p class="viewer-count" aria-live="polite" aria-atomic="true"></p>`;
  document.body.append(viewer);
  const image = viewer.querySelector('img');
  const caption = viewer.querySelector('figcaption');
  const count = viewer.querySelector('.viewer-count');
  const previous = viewer.querySelector('.viewer-prev');
  const next = viewer.querySelector('.viewer-next');
  let items = [], index = 0, opener, scrollY = 0, bodyStyle;
  let gesture = null, suppressClickUntil = 0;

  function show(position) {
    index = (position + items.length) % items.length;
    const link = items[index];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || '';
    caption.hidden = !caption.textContent;
    count.textContent = `${index + 1} / ${items.length}`;
    previous.hidden = next.hidden = items.length < 2;
  }

  galleries.forEach(gallery => {
    const links = [...gallery.querySelectorAll('a')].filter(link => link.querySelector('img'));
    links.forEach((link, position) => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        items = links;
        opener = link;
        show(position);
        scrollY = window.scrollY;
        bodyStyle = document.body.getAttribute('style');
        Object.assign(document.body.style, { position: 'fixed', top: `-${scrollY}px`, width: '100%' });
        viewer.showModal();
        viewer.querySelector('.viewer-close').focus();
      });
    });
  });

  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('close', () => {
    if (bodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', bodyStyle);
    const behavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollY);
    document.documentElement.style.scrollBehavior = behavior;
    opener?.focus({ preventScroll: true });
    gesture = null;
  });
  viewer.addEventListener('click', event => {
    if (Date.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (!event.target.closest('img, button, figcaption')) viewer.close();
  }, true);

  viewer.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) {
      gesture = null;
      suppressClickUntil = Date.now() + 700;
      return;
    }
    if (event.target.closest('button')) { gesture = null; return; }
    const touch = event.touches[0];
    gesture = { x: touch.clientX, y: touch.clientY, moved: false };
  }, { passive: true });
  viewer.addEventListener('touchmove', event => {
    if (!gesture) return;
    if (event.touches.length !== 1) { gesture = null; suppressClickUntil = Date.now() + 700; return; }
    const touch = event.touches[0];
    const dx = touch.clientX - gesture.x, dy = touch.clientY - gesture.y;
    if (Math.hypot(dx, dy) > 10) gesture.moved = true;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) event.preventDefault();
  }, { passive: false });
  viewer.addEventListener('touchend', event => {
    if (!gesture) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - gesture.x, dy = touch.clientY - gesture.y;
    if (gesture.moved || Math.hypot(dx, dy) > 10) suppressClickUntil = Date.now() + 700;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.25) show(index + (dx < 0 ? 1 : -1));
    gesture = null;
  }, { passive: true });
  viewer.addEventListener('touchcancel', () => { gesture = null; suppressClickUntil = Date.now() + 700; });
})();
