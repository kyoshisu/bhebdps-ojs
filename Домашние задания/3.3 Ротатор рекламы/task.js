function initRotator(rotatorEl) {
  const cases = Array.from(rotatorEl.querySelectorAll('.rotator__case'));
  if (cases.length === 0) return;

  function getActiveIndex() {
    const idx = cases.findIndex((el) => el.classList.contains('rotator__case_active'));
    return idx === -1 ? 0 : idx;
  }

  function applyCaseAppearance(caseEl) {
    const color = caseEl.dataset.color;
    if (color) {
      caseEl.style.color = color;
    }
  }

  function getCaseDelay(caseEl) {
    const raw = caseEl.dataset.speed;
    const delay = Number.parseInt(raw ?? '', 10);
    return Number.isFinite(delay) && delay > 0 ? delay : 1000;
  }

  function tick() {
    const activeIndex = getActiveIndex();
    const current = cases[activeIndex];
    const next = cases[(activeIndex + 1) % cases.length];

    current.classList.remove('rotator__case_active');
    next.classList.add('rotator__case_active');
    applyCaseAppearance(next);

    window.setTimeout(tick, getCaseDelay(next));
  }

  applyCaseAppearance(cases[getActiveIndex()]);
  window.setTimeout(tick, getCaseDelay(cases[getActiveIndex()]));
}

document.addEventListener('DOMContentLoaded', () => {
  const rotators = Array.from(document.querySelectorAll('.rotator'));
  rotators.forEach(initRotator);
});

