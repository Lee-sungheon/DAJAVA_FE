import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  'html, body, div, LegacyTypography, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed,figure, figcaption, footer, header, hgroup,menu, nav, output, ruby, section, summary,time, mark, audio, video, sup':
    {
      verticalAlign: 'baseline',
      font: 'inherit',
    },

  'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
    display: 'block',
  },

  '*': {
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    fontDisplay: 'swap',
  },

  'html, body': {
    width: '100%',
    padding: 0,
    margin: 0,
    background: 'whtie',
    '-webkit-appearance': 'none',
  },

  body: {
    minHeight: '100vh',
  },

  'ol, ul': {
    listStyle: 'none',
  },

  'blockquote, q': {
    quotes: 'none',
  },

  'blockquote:before, blockquote:after, q:before, q:after': {
    content: '',
  },

  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  a: {
    color: 'black',
    textDecoration: 'none',
    outline: 'none',
  },

  'img, a': {
    '-webkit-user-drag': 'none',
    '-khtml-user-drag': 'none',
    '-moz-user-drag': 'none',
    '-o-user-drag': 'none',
    userDrag: 'none',
  },

  'input, textarea': {
    '-webkit-user-select': 'text',
    '-khtml-user-select': 'text',
    '-moz-user-select': 'text',
    '-o-user-select': 'text',
    userSelect: 'text',
  },
});
