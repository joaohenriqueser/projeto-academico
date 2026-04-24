import { FaSave, FaCity } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useAlterar } from "../../services/cidade/hook/useAlterar";
import { useResources } from "../../services/providers/ResourcesProviders";
import React from "react";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";

export default function AlterarCidade() {
  const {
    model,
    errors,
    handleChangeField,
    validateField,
    onSubmitForm,
    handleCancel,
  } = useAlterar();
  
  const id = 1; // ID should probably come from params but keeping existing logic structure
  const { getEndpoint } = useResources();
  
  let url = React.useMemo(() => {
    return getEndpoint('cidade', id);
  }, [getEndpoint, id]);

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#0d6efd' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaCity style={{ color: '#0d6efd' }} /> 
            Alterar Cidade
          </h2>
          
          <form onSubmit={(e) => onSubmitForm(e, url!)}>
            <div className="grid-row">
              <div className="field-group">
                <label>{CIDADE.LABEL.CODIGO} <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  value={model?.codCidade}
                  onChange={(e) => handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)}
                  onBlur={(e) => validateField(CIDADE.FIELDS.CODIGO, e)}
                />
                {errors?.codCidade && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.codCidadeMensagem}</span>}
              </div>
              <div className="field-group">
                <label>{CIDADE.LABEL.NOME} <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  value={model?.nomeCidade}
                  onChange={(e) => handleChangeField(CIDADE.FIELDS.NOME, e.target.value)}
                  onBlur={(e) => validateField(CIDADE.FIELDS.NOME, e)}
                />
                {errors?.nomeCidade && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.nomeCidadeMensagem}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={handleCancel}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#0d6efd' }}>
                <FaSave size={18} /> Atualizar Cidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
