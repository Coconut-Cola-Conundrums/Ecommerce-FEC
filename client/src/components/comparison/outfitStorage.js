export const saveOutfits = (outfit) => {
    const serializedOutfit = JSON.stringify(outfit);
    localStorage.setItem('customerOutfit', serializedOutfit);
};

export const grabOutfits = () => {
  const serializedOutfit = localStorage.getItem('customerOutfit');
  if (serializedOutfit) {
    return JSON.parse(serializedOutfit);
  }
};
