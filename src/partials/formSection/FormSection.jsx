import React, { useEffect, useRef, useState } from "react";
import "./FormSection.scss";
import Loader from "../../components/loader/Loader";
import MessageBox from "../../components/messageBox/MessageBox";
import giantheart from "../../assets/giantheart.webp";
import promemoria from "../../assets/pensione-pina.png";
import fingerscrossed from "../../assets/fingerscrossed.webp";

const FormSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    presenza: null,
  });

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

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

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = promemoria; // URL statico generato da Vite
    link.download = "pensione-pina.png";
    link.click();
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
              <img src={giantheart} className="avatar-pina" />
              {formData.presenza ? (
                <div>
                  <p>{`Grazie ${formData.nome} per la conferma!`}</p>
                  <p>Sarà un piacere festeggiare insieme.</p>
                </div>
              ) : (
                <div>
                  <p>{`Grazie ${formData.nome} per aver avvisato!`}</p>
                  <p>
                    Mi dispiace che non potrai esserci, sarebbe stato bello
                    festeggiare insieme.
                  </p>
                  <p>Alla prossima occasione!</p>
                </div>
              )}

              {formData.presenza && (
                <button onClick={handleDownload} className="cta">
                  Scarica Promemoria
                </button>
              )}
            </div>
          ),
        });
        setFormData({ nome: "", cognome: "", presenza: null });
      } else {
        setMessage({
          type: "error",
          text: (
            <div className="success-message">
              Qualcosa è andato storto 😅
              <button onClick={() => setMessage(null)} className="cta">
                Riprova
              </button>
            </div>
          ),
        });
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
      <div ref={sectionRef} id="form-section" className="form-section section">
        <img
          className={`wow-img avatar-pina ${visible ? "visible" : ""}`}
          src={fingerscrossed}
        />
        <div className="text-wrapper text">
          <p className="text">
            Per organizzarmi al meglio, ho bisogno di sapere se ci sarai. Puoi
            dirmelo entro il 31/12 compilando il form qui sotto:
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
