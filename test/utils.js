const isOffscreen = el => {
  const rect = getRect(el);
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

const getMaxItemsWidth = (dropdownMenu) => (
  select(
    '.Dropdown-item, .Dropdown-link',
    dropdownMenu
  ).reduce((max, item) => {
    const itemWidth = getRect(item).width;
    return itemWidth > max ? itemWidth : max;
  }, 0)
);

const getRect = el => el.getBoundingClientRect();

const makeDropdown = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="Dropdown is-expanded">
      <button class="Dropdown-toggle">dropdown</button>
      <ul class="Dropdown-menu">
        <li class="Dropdown-item">
          item
        </li>
        <li class="Dropdown-item">
          <a href="#" class="Dropdown-link">link item</a>
        </li>
      </ul>
    </div>
  `;
  return container.children[0];
};

const select = (selector, root) => {
  const rootElem = ((root.nodeType === 1 || root === window) && root || document);
  return [].slice.call(rootElem.querySelectorAll(selector));
};

const toggleClass = (el, classname) => el.classList.toggle(classname);

const toggleRtl = () => {
  const b = document.body;
  b.setAttribute('dir', b.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
};

const prepare = styles => {
  const dropdown = makeDropdown();
  const dropdownMenu = dropdown.querySelector('.Dropdown-menu');
  const settings = {
    dom: dropdown,
    styles
  };

  return {
    dropdown,
    dropdownMenu,
    settings
  };
};

module.exports = {
  isOffscreen,
  getMaxItemsWidth,
  getRect,
  prepare,
  select,
  toggleClass,
  toggleRtl
};
