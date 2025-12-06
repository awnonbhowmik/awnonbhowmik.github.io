/**
 * Sanitization utilities for user inputs
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param str - The string to sanitize
 * @returns Sanitized string safe for HTML insertion
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return str.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Sanitizes title input for blog posts
 * Removes or escapes potentially dangerous characters
 * @param title - The title to sanitize
 * @returns Sanitized title
 */
export function sanitizeTitle(title: string): string {
  if (!title) return '';
  
  // Escape HTML entities instead of trying to remove tags
  let sanitized = escapeHtml(title);
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Limit length
  if (sanitized.length > 200) {
    sanitized = sanitized.substring(0, 200);
  }
  
  return sanitized;
}

/**
 * Sanitizes category input
 * Ensures only alphanumeric and hyphens are allowed
 * @param category - The category to sanitize
 * @returns Sanitized category
 */
export function sanitizeCategory(category: string): string {
  if (!category) return '';
  
  // Allow only alphanumeric characters and hyphens
  return category.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

/**
 * Sanitizes tags input
 * @param tags - Comma-separated tags string
 * @returns Array of sanitized tags
 */
export function sanitizeTags(tags: string): string[] {
  if (!tags) return [];
  
  return tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => {
      // Only allow alphanumeric characters, spaces, and hyphens
      // This prevents any HTML or special characters
      const sanitized = tag.replace(/[^a-zA-Z0-9\s-]/g, '');
      return sanitized.trim();
    })
    .filter(tag => tag.length > 0)
    .slice(0, 10); // Limit to 10 tags
}

/**
 * Sanitizes excerpt/description text
 * @param excerpt - The excerpt to sanitize
 * @returns Sanitized excerpt
 */
export function sanitizeExcerpt(excerpt: string): string {
  if (!excerpt) return '';
  
  // Escape HTML entities instead of trying to remove tags
  let sanitized = escapeHtml(excerpt);
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Limit length
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500);
  }
  
  return sanitized;
}

/**
 * Validates email format
 * @param email - The email to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitizes email input
 * @param email - The email to sanitize
 * @returns Sanitized email or empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  const sanitized = email.trim().toLowerCase();
  return isValidEmail(sanitized) ? sanitized : '';
}
