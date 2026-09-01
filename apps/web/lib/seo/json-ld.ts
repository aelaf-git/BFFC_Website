/** Serializes JSON-LD so a `</script>` sequence cannot break out of the tag. */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
