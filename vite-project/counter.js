export function setupCounter(element) {
  const setCounter = (count) => {
    console.log('I AM HERE');
  };

  element.addEventListener('click', () => setCounter());
};
