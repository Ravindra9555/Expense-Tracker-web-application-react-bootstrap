
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Example: Password must be at least 6 characters
    return password.length >= 6;
  };
  export const validateImage = (file) => {
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
  
    if (file.size > maxSizeInBytes) {
      return `File size should be less than ${maxSizeInMB} MB`;
    }
  
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Only JPEG, JPG, PNG, WebP, and SVG are allowed.';
    }
  
    return null; // No error
  };
  
  