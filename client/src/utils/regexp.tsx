const HTML_INJECTION = /&gt;|&GT;|&lt;|&LT;|<|>|&#60;|&#62;/;

export const HTML_INJECTION_REGEXP = new RegExp(HTML_INJECTION, "g");
