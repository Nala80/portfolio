// Tiny templating primitive shared by every component.
//
// `html` is a tagged template: interpolated values are HTML-escaped unless they
// are themselves the result of `html` (or `raw`). That keeps content from the
// data files from ever breaking the markup, without needing a template engine.
//
//   html`<p>${user.name}</p>`         -> name is escaped
//   html`<ul>${items.map(item)}</ul>` -> arrays are joined, nested html kept as-is
//   html`${condition && html`<b>`}`  -> false / null / undefined render nothing

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export class SafeHtml {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

/** Marks a trusted string as HTML so it is not escaped. Use sparingly. */
export function raw(value) {
  return new SafeHtml(String(value));
}

function render(value) {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i += 1) {
    out += render(values[i]) + strings[i + 1];
  }
  return new SafeHtml(out);
}
