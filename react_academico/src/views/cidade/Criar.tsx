import { FaSave, FaCity } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useCriar } from "../../services/cidade/hook/useCriar";
import { ROTA } from "../../services/router/url";

export default function CriarCidade() {
  const navigate = useNavigate();
  const { model, errors, handleChangeField, validateField, onSubmitForm } = useCriar();

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#0d6efd' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaCity style={{ color: '#0d6efd' }} /> 
            Nova Cidade
          </h2>
          
          <form onSubmit={onSubmitForm}>
            <div className="grid-row">
              <div className="field-group">
                <label>{CIDADE.LABEL.CODIGO} <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: 3550308"
                  value={model?.codCidade}
                  onChange={(e) => handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)}
                  onBlur={(e) => validateField(CIDADE.FIELDS.CODIGO, e)}
                />
                {errors.codCidade && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.codCidadeMensagem}</span>}
              </div>
              <div className="field-group">
                <label>{CIDADE.LABEL.NOME} <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Nome da cidade"
                  value={model?.nomeCidade}
                  onChange={(e) => handleChangeField(CIDADE.FIELDS.NOME, e.target.value)}
                  onBlur={(e) => validateField(CIDADE.FIELDS.NOME, e)}
                />
                {errors.nomeCidade && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.nomeCidadeMensagem}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.CIDADE.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#0d6efd' }}>
                <FaSave size={18} /> Salvar Cidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
