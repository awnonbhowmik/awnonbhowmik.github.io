/**
 * Validates email format
 * Uses a more comprehensive RFC-compliant email validation
 * @param email - The email to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // More comprehensive email validation based on RFC 5322
  // Allows most valid email formats while rejecting obvious malformed addresses
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional validation checks
  if (email.length > 254) return false; // RFC 5321 maximum length
  if (email.startsWith('.') || email.endsWith('.')) return false;
  if (email.includes('..')) return false; // No consecutive dots
  
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  if (parts[0].length > 64) return false; // Local part max length
  if (parts[1].length > 255) return false; // Domain max length
  
  return emailRegex.test(email);
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
