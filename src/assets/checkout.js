let component;
let cardState = {
  numeroCartaoEncriptado: "",
  numeroMesEncriptado: "",
  numeroAnoEncriptado: "",
  numeroCvvEncriptado: "",
  valido: false,
};

const initAdyenComponent = async () => {
  const configuration = {
    locale: "pt-BR",
    environment: "test",
    clientKey: "test_R7JIB5347NG2VNU5YYJTCME2JUI6LB42",
  };

  const checkout = await AdyenCheckout(configuration);

  const customCardComponent = checkout
    .create("securedfields", {
      type: "card",
      brands: ["mc", "visa", "amex", "bcmc", "maestro"],
      onChange: (state, component) => {
        const { paymentMethod } = state.data;

        cardState.numeroCartaoEncriptado = paymentMethod.encryptedCardNumber; // prettier-ignore
        cardState.numeroMesEncriptado = paymentMethod.encryptedExpiryMonth; // prettier-ignore
        cardState.numeroAnoEncriptado = paymentMethod.encryptedExpiryYear; // prettier-ignore
        cardState.numeroCvvEncriptado = paymentMethod.encryptedSecurityCode; // prettier-ignore
        cardState.valido = state.isValid;
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
    })
    .mount("#frmCustomCard");

  return customCardComponent;
};

const onSubmit = (event) => {
  event.preventDefault();
  console.log(cardState);
};

const isComponentLoaded = () => typeof component != "undefined";

const getCardStateAsString = () => JSON.stringify(cardState);

window.onload = async () => {
  component = await initAdyenComponent();
};
