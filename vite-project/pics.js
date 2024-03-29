export function showPics(element) {
  // versio 1, haetaan kissakuvat json tiedostosta
  // ja muokataan index.html tietoja
  async function modifyHTMLPics() {
    console.log("Haetaan kuvat paikallisesta JSON tiedostosta!");

    try {
      // fetch
      const response = await fetch("pics.json");
      if (!response.ok) throw new Error("Huono haku!!");
      const images = await response.json();

      console.log(images);
      const alt = images[1].name;
      const figurecap = images[1].description;
      const imagesrc = images[1].address;

      // haetaan kuvaelementti html tiedostosta
      const kuva = document.querySelector("img");
      kuva.src = imagesrc;
      kuva.alt = alt;

      // haetaan kuvateksti html tiedostosta
      const kuvateksti = document.querySelector("figcaption");
      kuvateksti.innerText = figurecap;
    } catch (error) {
      console.log(error);
    }
  }

  // versio 2, luodaan DOM elementit itse
  async function createPics() {
    console.log("Luodaan kuvat lennossa!");

    try {
      // fetch
      const response = await fetch("pics.json");
      if (!response.ok) throw new Error("Huono haku!!");
      const images = await response.json();

      // loopataan kaikki kissakuvat läpi
      // generoidaan jokaisesta 'figure', 'img' ja 'figcaption' elementit
      images.forEach((item) => {
        console.log(`Nimi: ${item.name}`);
      });
      console.log(images);

      // luodaan yksi figure
      // haetaan ensin elementti johon haluat että kuvat lisätään
      const cards = document.querySelector("#cards");
      cards.innerHTML = "";

      const alt = images[1].name;
      const figurecap = images[1].description;
      const imagesrc = images[1].address;

      // luo uusi figure elementti
      const figure = document.createElement("figure");
      cards.appendChild(figure);

      // luodaan img elementti
      const image = document.createElement("img");
      image.src = imagesrc;
      image.alt = alt;
      figure.appendChild(image);

      // luodaan figcaption elementti
      const figurecaption = document.createElement("figurecaption");
      // luodaan teksti figcaptionin sisälle
      const node = document.createTextNode("Miu mau");
      // lisätään se figcaptionin lapseksi
      figurecaption.appendChild(node);

      figure.appendChild(figurecaption);
    } catch (error) {
      console.log(error);
    }
  }

  // versio 3
  async function createPicsLoop() {
    console.log("Luodaan kuvat lennossa!");

    try {
      // fetch
      const response = await fetch("pics.json");
      if (!response.ok) throw new Error("Huono haku!!");
      const images = await response.json();

      console.log(images);
      console.log('Tehdään loopissa');

      // luodaan yksi figure
      // haetaan ensin elementti johon haluat että kuvat lisätään
      const cards = document.querySelector("#cards");
      cards.innerHTML = "";

      // loopataan kaikki kissakuvat läpi
      // generoidaan jokaisesta 'figure', 'img' ja 'figcaption' elementit
      images.forEach((item) => {
        console.log(`Nimi: ${item.name}`);

        // luo uusi figure elementti
        const figure = document.createElement("figure");
        cards.appendChild(figure);

        // luodaan img elementti
        const image = document.createElement("img");
        image.src = item.address;
        image.alt = item.name;
        figure.appendChild(image);

        // luodaan figcaption elementti
        const figurecaption = document.createElement("figurecaption");
        // luodaan teksti figcaptionin sisälle
        const node = document.createTextNode(item.description);
        // lisätään se figcaptionin lapseksi
        figurecaption.appendChild(node);

        figure.appendChild(figurecaption);
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(element);
  element.addEventListener("click", () => createPicsLoop());
}
