export const fullName = (person = {}) => [person.firstName, person.lastName].filter(Boolean).join(" ") || "Developer";
export const initials = (person = {}) => `${person.firstName?.[0] || "D"}${person.lastName?.[0] || ""}`.toUpperCase();
export const getErrorMessage = (error) => error?.message || "Something went wrong. Please try again.";
