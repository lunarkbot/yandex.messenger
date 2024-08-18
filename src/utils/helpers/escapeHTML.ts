export default function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, function(match: string): string {
    const escape: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escape[match];
  });
}
