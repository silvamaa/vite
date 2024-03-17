export function showJoke(element) {
  async function getJoke() {
    console.log("Moi, täällä ollaan!");
    try {
      // yritetään haku
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      console.log(response);
      if (!response.ok) throw new Error('Huono haku!');

      // tämäkin kestää
      const jokes = await response.json();
      console.log(jokes);
      console.log(jokes.value);

      // viedään se Divin sisään sivulle
      document.querySelector('.show_joke').innerHTML = jokes.value;
    } catch (error) {
      // jos virhe, niin tehdään jtn
      console.log(error)
    }
  }


    console.log(element);
    element.addEventListener('click', () => getJoke());
  }
