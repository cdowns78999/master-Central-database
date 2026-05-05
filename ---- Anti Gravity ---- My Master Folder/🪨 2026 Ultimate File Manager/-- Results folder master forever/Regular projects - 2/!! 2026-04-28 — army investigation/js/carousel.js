/* ============================================================
   carousel.js — shared carousel module
   usage:
     mountCarousel({ container, data, renderCard });
   ============================================================ */

export function mountCarousel({ container, data, renderCard }) {
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <strong>Data not yet loaded</strong>
        Source JSON is empty or unavailable. Check back once it lands.
      </div>`;
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'carousel';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  const slides = document.createElement('div');
  slides.className = 'carousel-slides';

  data.forEach((item, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');
    slide.appendChild(renderCard(item, idx));
    slides.appendChild(slide);
  });

  track.appendChild(slides);
  wrap.appendChild(track);

  // arrows + counter
  const controls = document.createElement('div');
  controls.className = 'carousel-arrows';

  const prev = document.createElement('button');
  prev.className = 'car-btn';
  prev.type = 'button';
  prev.innerHTML = '<span aria-hidden="true">&larr;</span> <span>Prev</span>';

  const counter = document.createElement('div');
  counter.className = 'car-counter';

  const next = document.createElement('button');
  next.className = 'car-btn';
  next.type = 'button';
  next.innerHTML = '<span>Next</span> <span aria-hidden="true">&rarr;</span>';

  controls.append(prev, counter, next);
  wrap.appendChild(controls);
  container.appendChild(wrap);

  // state
  let index = 0;
  const total = data.length;

  function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    counter.innerHTML = `<strong>${String(index + 1).padStart(2, '0')}</strong> / ${String(total).padStart(2, '0')}`;
    prev.disabled = index === 0;
    next.disabled = index === total - 1;
    Array.from(slides.children).forEach((el, i) => {
      el.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  function go(dir) {
    const target = index + dir;
    if (target < 0 || target >= total) return;
    index = target;
    update();
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // swipe
  let startX = 0;
  let dragging = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (!dragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) go(diff > 0 ? -1 : 1);
    dragging = false;
  });

  update();
}

/* ============================================================
   pros/cons inference helpers
   used by 2-pros-cons.html
   ============================================================ */

export function inferPros(mos) {
  const cat = (mos.category || '').toLowerCase();
  const generic = [
    'Steady paycheck plus housing, healthcare, and meals covered while you serve.',
    'Education benefits (GI Bill, tuition assistance) usable during and after service.',
    'Builds discipline, leadership, and a network you carry for life.'
  ];
  if (cat.includes('infantry') || cat.includes('combat')) {
    return [
      'Tight unit bond — the camaraderie in combat arms is unmatched in civilian life.',
      'Direct hands-on field experience and physical conditioning at a high level.',
      'Clear mission focus — you know exactly what your job is each day.'
    ];
  }
  if (cat.includes('medical') || cat.includes('health')) {
    return [
      'Real clinical experience starting on day one of your duty role.',
      'Skills transfer directly to civilian healthcare careers (EMT, nursing, PA).',
      'High respect across every unit — medics are universally valued.'
    ];
  }
  if (cat.includes('cyber') || cat.includes('signal') || cat.includes('intel') || cat.includes('intelligence')) {
    return [
      'Top-tier technical training that civilian employers pay heavily for.',
      'Security clearance opens doors to high-paying gov/contractor jobs.',
      'Cutting-edge equipment and exposure most civilians never get near.'
    ];
  }
  if (cat.includes('logistics') || cat.includes('supply') || cat.includes('transport')) {
    return [
      'Operational experience translating directly to civilian supply chain roles.',
      'Lower direct combat exposure compared to front-line MOSs.',
      'Tangible skills — equipment, scheduling, inventory — visible on a resume.'
    ];
  }
  if (cat.includes('aviation') || cat.includes('pilot')) {
    return [
      'Flight hours and ratings that cost civilians six figures to earn.',
      'Pathway to commercial aviation careers post-service.',
      'Elite training environment with strong technical mentorship.'
    ];
  }
  return generic;
}

export function inferCons(mos) {
  const cat = (mos.category || '').toLowerCase();
  const generic = [
    'Multi-year contract with limited ability to leave early.',
    'Frequent moves can strain relationships and family planning.',
    'Bureaucracy and "hurry up and wait" culture can wear you down.'
  ];
  if (cat.includes('infantry') || cat.includes('combat')) {
    return [
      'Highest physical wear — joints, back, knees take real damage over a career.',
      'Direct combat exposure brings real risk of injury, death, and PTSD.',
      'Fewer transferable civilian skills compared to technical MOSs.'
    ];
  }
  if (cat.includes('medical') || cat.includes('health')) {
    return [
      'Heavy emotional weight — you see trauma, loss, and tough cases up close.',
      'Long shifts and high-pressure decisions, sometimes in austere settings.',
      'Civilian licensing may still require additional schooling after service.'
    ];
  }
  if (cat.includes('cyber') || cat.includes('signal') || cat.includes('intel') || cat.includes('intelligence')) {
    return [
      'Lengthy clearance process — life on hold during onboarding.',
      'Long sedentary shifts and on-call rotations burn people out.',
      'Restricted social media / travel rules affect personal freedom.'
    ];
  }
  if (cat.includes('logistics') || cat.includes('supply') || cat.includes('transport')) {
    return [
      'Less prestige inside the army — combat MOSs often get the spotlight.',
      'Convoy and transport roles still carry route ambush risk in deployments.',
      'Repetitive paperwork-heavy days can feel monotonous.'
    ];
  }
  if (cat.includes('aviation') || cat.includes('pilot')) {
    return [
      'Long pipeline — months of training before you fly real missions.',
      'Demanding standards; washouts are common and final.',
      'Higher inherent operational risk than most ground MOSs.'
    ];
  }
  return generic;
}
