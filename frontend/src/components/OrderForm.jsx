import { useEffect, useMemo, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { buildOrderMessage, buildWhatsAppUrl, validateOrder } from "../features/cart/whatsappMessage";
import { clearCustomerData, loadCustomerData, saveCustomerData } from "../features/cart/customerStorage";
import { formatCurrency, getCartTotal } from "../features/cart/cartUtils";

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
  const [orderReady, setOrderReady] = useState(false);

  const message = useMemo(() => buildOrderMessage(cartItems, formData), [cartItems, formData]);
  const whatsappUrl = buildWhatsAppUrl(message);

  useEffect(() => {
    setOrderReady(false);
  }, [cartItems]);

  useEffect(() => {
    function handleCustomerUpdate(event) {
      setFormData((current) => ({
        ...current,
        ...event.detail,
        notes: current.notes,
      }));
      setOrderReady(false);
    }

    window.addEventListener("pastelaria-customer-updated", handleCustomerUpdate);
    return () => window.removeEventListener("pastelaria-customer-updated", handleCustomerUpdate);
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setOrderReady(false);
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
    setOrderReady(false);
  }

  function handleReviewOrder(event) {
    event.preventDefault();
    const validation = validateOrder(cartItems, formData);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      if (saveData) saveCustomerData(formData);
      setOrderReady(true);
    }
  }

  function handleSendWhatsApp() {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="order-form" onSubmit={handleReviewOrder}>
      <h3>Finalizar pedido</h3>
      <p className="form-hint">Adicione tudo que quiser ao carrinho. Depois revise os dados, finalize o pedido e só então envie pelo WhatsApp.</p>
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
        </>
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

      <div className="order-review-box">
        <strong>Total do pedido: {formatCurrency(getCartTotal(cartItems))}</strong>
        <span>{orderReady ? "Pedido finalizado. Agora você pode enviar para a pastelaria pelo WhatsApp." : "Revise seus itens e clique em Finalizar pedido antes de enviar."}</span>
      </div>

      {!orderReady ? (
        <button className="btn btn-primary" type="submit">
          Finalizar pedido
        </button>
      ) : (
        <WhatsAppButton type="button" onClick={handleSendWhatsApp}>Enviar pedido pelo WhatsApp</WhatsAppButton>
      )}
    </form>
  );
}
