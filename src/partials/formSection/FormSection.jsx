import React, { useState } from "react";
import "./FormSection.scss";
import Loader from "../../components/loader/Loader";
import MessageBox from "../../components/messageBox/MessageBox";
import okay from "../../assets/okay.webp";

const FormSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    presenza: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      presenza: name === "parteciperò" ? true : false,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Costruisci URL con parametri GET
    const url = new URL(
      "https://script.google.com/macros/s/AKfycbxgVkIXTpuqpsONwqT1W_HfSMIdRurIFQO_VJY_qu8DAkLf8KyaUFqhU38USdudweKurw/exec"
    );
    url.searchParams.append("nome", formData.nome);
    url.searchParams.append("cognome", formData.cognome);
    url.searchParams.append("isPresent", formData.presenza);

    try {
      const response = await fetch(url.toString());
      const result = await response.json();

      if (result.status === "OK") {
        setMessage({
          type: "success",
          text: (
            <div className="success-message">
              <img src={okay} className="avatar-pina" />
              Grazie {formData.nome} per la tua risposta! Ci vediamo alla festa!
            </div>
          ),
        });
        setFormData({ nome: "", cognome: "", presenza: null });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Errore durante l'invio:", error);
      setMessage({ type: "error", text: "Qualcosa è andato storto, riprova." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !formData.nome ||
    !formData.cognome ||
    formData.presenza === null ||
    isSubmitting;

  return (
    <Loader isLoading={isSubmitting}>
      <div id="form-section" className="form-section section">
        <div className="text-wrapper text">
          <p className="text">
            Per favore dammi conferma entro il 30/12 compilando i campi qui
            sotto:
          </p>
        </div>
        <div className="input-wrapper">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="cognome">Cognome:</label>
          <input
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="checkbox-wrapper">
          <label className="cta">
            <input
              type="checkbox"
              name="parteciperò"
              checked={formData.presenza === true}
              onChange={handleCheckboxChange}
              disabled={isSubmitting}
            />
            Ci sarò
          </label>
          <label className="cta">
            <input
              type="checkbox"
              name="non parteciperò"
              checked={formData.presenza === false}
              onChange={handleCheckboxChange}
              disabled={isSubmitting}
            />
            Non ci sarò
          </label>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>
          Invia
        </button>
        {message && (
          <MessageBox
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        )}
      </div>
    </Loader>
  );
};

export default FormSection;
