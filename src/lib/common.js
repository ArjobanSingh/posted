export const stopPropagation = (e) => e.stopPropagation();
export const handleEnter = (callback) => (e) => {
  if (e.key === "Enter") callback(e);
};
