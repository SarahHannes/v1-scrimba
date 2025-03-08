window.onload = function () {
  const productDetailsEl = document.getElementById("productDetails");
  const productImage = document.getElementById("productImage");
  const productFrames = document.getElementsByClassName(
    "product-image_frame"
  )[0];
  const productLenses = document.getElementsByClassName(
    "product-image_lenses"
  )[0];

  async function fetchData() {
    const response = await fetch("./data.json");
    const data = await response.json();
    console.log("data", data);
    return data;
  }

  function setSunglasses(sunglassesNew = sunglasses) {
    console.log("in setSunglasses");
    console.log("sunglassesNew", sunglassesNew);
    return sunglassesNew;
  }

  function render(sunglassesNew) {
    // destructuring object and renaming (ref: https://wesbos.com/destructuring-renaming)
    const {
      name,
      price: modelPrice,
      thumbImg,
      cssClass: modelCssClass,
    } = sunglassesNew.model;

    const {
      color: lenseColor,
      price: lensePrice,
      cssClass: lenseCssClass,
    } = sunglassesNew.lenses;

    const {
      color: frameColor,
      price: framePrice,
      cssClass: frameCssClass,
    } = sunglassesNew.frame;

    console.log("name", name);
    sunglassesNew = {
      model: {
        name,
        price: modelPrice,
        thumbImg,
        cssClass: modelCssClass,
      },
      lenses: {
        color: lenseColor,
        price: lensePrice,
        cssClass: lenseCssClass,
      },
      frame: {
        color: frameColor,
        price: framePrice,
        cssClass: frameCssClass,
      },
    };

    let newPrice = `$ ${modelPrice + lensePrice + framePrice}`;

    productDetailsEl.innerHTML = `<h1>${name}</h1>
    <p>Custom: ${lenseColor} lenses, ${frameColor} frames</p>
    <p>${newPrice}</p>
    `;

    const currClass = productImage.classList[1];
    productImage.classList.replace(currClass, modelCssClass);

    const currFramesClass = productFrames.classList[1];
    productFrames.classList.replace(currFramesClass, frameCssClass);

    const currLensesClass = productLenses.classList[1];
    productLenses.classList.replace(currLensesClass, lenseCssClass);
  }

  //Highlight current selection
  function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
      Array.from(document.getElementsByClassName("product-thumb")).forEach(
        function (thumb) {
          thumb.classList.remove("selected");
        }
      );
    } else if (clickedItem.classList.contains("product-color-swatch")) {
      const siblings = clickedItem.closest("ul").querySelectorAll("button");
      Array.from(siblings).forEach(function (swatch) {
        swatch.classList.remove("selected");
      });
    }
    clickedItem.classList.add("selected");
  }

  const sunglasses = {
    model: {
      name: "aviator",
      price: 300,
      thumbImg: "./images/thumb-aviator.png",
      cssClass: "frame-aviator",
    },
    lenses: {
      color: "sepia",
      price: 20,
      cssClass: "color-sepia",
    },
    frame: {
      color: "charcoal",
      price: 0,
      cssClass: "color-charcoal",
    },
  };

  fetchData().then((data) => {
    const sunglassesOptions = data;

    let sunglassesNew = "";

    document.body.addEventListener("click", function (event) {
      const clickedItem = event.target;

      console.log("clickedItem", clickedItem);
      //if sunglassesNew defined take variable from updates
      //else use original sunglasses object
      if (!sunglassesNew) {
        sunglassesNew = sunglasses;
      }

      const {
        model: {
          name: prevModelName,
          price: prevModelPrice,
          thumbImg: prevModelImg,
          cssClass: prevModelClass,
        },
        lenses: {
          color: prevLenseColor,
          price: prevLensePrice,
          cssClass: prevLenseClass,
        },
        frame: {
          color: prevFrameColor,
          price: prevFramePrice,
          cssClass: prevFrameClass,
        },
      } = sunglassesNew;

      // update model
      if (clickedItem.classList.contains("product-thumb")) {
        console.log("in update model");

        const currName = clickedItem.dataset.name;

        const modelOptions = sunglassesOptions.models.filter(function (item) {
          return item.name === currName;
        })[0];

        const {
          name: newModelName,
          price: newModelPrice,
          thumbImg: newModelImg,
          cssClass: newModelClass,
        } = modelOptions;

        sunglassesNew = {
          model: {
            name: newModelName,
            price: newModelPrice,
            thumbImg: newModelImg,
            cssClass: newModelClass,
          },
          lenses: {
            color: prevLenseColor,
            price: prevLensePrice,
            cssClass: prevLenseClass,
          },
          frame: {
            color: prevFrameColor,
            price: prevFramePrice,
            cssClass: prevFrameClass,
          },
        };

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
      }

      // update colors for frames / lenses
      if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color;

        // check nearest parent div
        //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
          console.log("in update lense");

          const colorOptions = sunglassesOptions.lenses.filter(function (item) {
            return item.color === currColor;
          })[0];

          const {
            color: newLenseColor,
            price: newLensePrice,
            cssClass: newLenseClass,
          } = colorOptions;

          sunglassesNew = {
            model: {
              name: prevModelName,
              price: prevModelPrice,
              thumbImg: prevModelImg,
              cssClass: prevModelClass,
            },
            lenses: {
              color: newLenseColor,
              price: newLensePrice,
              cssClass: newLenseClass,
            },
            frame: {
              color: prevFrameColor,
              price: prevFramePrice,
              cssClass: prevFrameClass,
            },
          };
        }

        //frames
        else {
          console.log("in update frame");

          const colorOptions = sunglassesOptions.frames.filter(function (item) {
            return item.color === currColor;
          })[0];

          const {
            color: newFrameColor,
            price: newFramePrice,
            cssClass: newFrameClass,
          } = colorOptions;

          sunglassesNew = {
            model: {
              name: prevModelName,
              price: prevModelPrice,
              thumbImg: prevModelImg,
              cssClass: prevModelClass,
            },
            lenses: {
              color: prevLenseColor,
              price: prevLensePrice,
              cssClass: prevLenseClass,
            },
            frame: {
              color: newFrameColor,
              price: newFramePrice,
              cssClass: newFrameClass,
            },
          };
        }

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
      }
    });

    render(sunglasses);
  });
};
