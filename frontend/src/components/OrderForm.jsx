import { useMemo, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { buildOrderMessage, buildWhatsAppUrl, validateOrder } from "../features/cart/whatsappMessage";
import { clearCustomerData, loadCustomerData, saveCustomerData } from "../features/cart/customerStorage";

const initialForm = {
  name: "",
  phone: "",
  receiveType: "retirada",
  address: "",
  locationUrl: "",
  payment: "",
  notes: "",
};

export default function OrderForm({ cartItems }) {
  const [formData, setFormData] = useState(() => ({ ...initialForm, ...loadCustomerData(), notes: "" }));
  const [errors, setErrors] = useState({});
  const [saveData, setSaveData] = useState(true);
  const [locationStatus, setLocationStatus] = useState("");

  const message = useMemo(() => buildOrderMessage(cartItems, formData), [cartItems, formData]);
  const whatsappUrl = buildWhatsAppUrl(message);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => {
      const nextData = { ...current, [name]: value };
      if (saveData) saveCustomerData(nextData);
      return nextData;
    });
  }

  function handleSaveDataChange(event) {
    const shouldSave = event.target.checked;
    setSaveData(shouldSave);

    if (shouldSave) {
      saveCustomerData(formData);
    } else {
      clearCustomerData();
    }
  }

  function handleClearSavedData() {
    clearCustomerData();
    setFormData(initialForm);
    setSaveData(false);
    setErrors({});
    setLocationStatus("");
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Seu navegador não permite enviar localização.");
      return;
    }

    setLocationStatus("Solicitando localização...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setFormData((current) => {
          const nextData = { ...current, locationUrl };
          if (saveData) saveCustomerData(nextData);
          return nextData;
        });
        setLocationStatus("Localização adicionada ao pedido.");
      },
      () => {
        setLocationStatus("Não foi possível obter a localização. Você pode informar o endereço manualmente.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validateOrder(cartItems, formData);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      if (saveData) saveCustomerData(formData);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Finalizar pelo WhatsApp</h3>
      <p className="form-hint">Seus dados serão enviados pelo WhatsApp. Se desejar, eles ficam salvos apenas neste aparelho para o próximo pedido.</p>
      {errors.cart && <p className="error-message">{errors.cart}</p>}

      <label>
        Nome *
        <input name="name" value={formData.name} onChange={updateField} placeholder="Seu nome" />
        {errors.name && <small>{errors.name}</small>}
      </label>

      <label>
        Telefone *
        <input name="phone" value={formData.phone} onChange={updateField} placeholder="(00) 00000-0000" />
        {errors.phone && <small>{errors.phone}</small>}
      </label>

      <fieldset>
        <legend>Tipo de recebimento *</legend>
        <label className="radio-label">
          <input type="radio" name="receiveType" value="retirada" checked={formData.receiveType === "retirada"} onChange={updateField} />
          Retirada
        </label>
        <label className="radio-label">
          <input type="radio" name="receiveType" value="entrega" checked={formData.receiveType === "entrega"} onChange={updateField} />
          Entrega
        </label>
      </fieldset>

      {formData.receiveType === "entrega" && (
        <>
          <label>
            Endereço *
            <input name="address" value={formData.address} onChange={updateField} placeholder="Rua, número, bairro e referência" />
            {errors.address && <small>{errors.address}</small>}
          </label>

          <div className="location-box">
            <div>
              <strong>Localização do cliente</strong>
              <span>{formData.locationUrl ? "Localização pronta para enviar no WhatsApp." : "Use para ajudar a entrega a encontrar você."}</span>
            </div>
            <button className="btn btn-light" type="button" onClick={requestLocation}>
              Usar minha localização
            </button>
            {locationStatus && <small>{locationStatus}</small>}
          </div>
        </>
      )}

      {formData.receiveType !== "entrega" && (
        <div className="location-box">
          <div>
            <strong>Localização do cliente</strong>
            <span>{formData.locationUrl ? "Localização pronta para enviar no WhatsApp." : "Opcional. Use se quiser enviar sua localização junto do pedido."}</span>
          </div>
          <button className="btn btn-light" type="button" onClick={requestLocation}>
            Usar minha localização
          </button>
          {locationStatus && <small>{locationStatus}</small>}
        </div>
      )}

      <label>
        Forma de pagamento *
        <select name="payment" value={formData.payment} onChange={updateField}>
          <option value="">Escolha</option>
          <option>Pix</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        {errors.payment && <small>{errors.payment}</small>}
      </label>

      <label>
        Observações
        <textarea name="notes" value={formData.notes} onChange={updateField} placeholder="Ex.: sem cebola, troco para R$ 50..." />
      </label>

      <div className="saved-customer-box">
        <label className="checkbox-label">
          <input type="checkbox" checked={saveData} onChange={handleSaveDataChange} />
          Salvar meus dados neste aparelho
        </label>
        <button type="button" onClick={handleClearSavedData}>
          Apagar dados salvos
        </button>
      </div>

      <WhatsAppButton type="submit">Enviar pedido</WhatsAppButton>
    </form>
  );
}
