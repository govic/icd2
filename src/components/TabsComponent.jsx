import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useVisibility } from '../context/VisibilityContext';

const opcionesParticionHA = [
    { value: 'opcion1', label: 'Opción 1', isFixed: true },
    { value: 'opcion2', label: 'Opción 2', isFixed: false },
    { value: 'opcion3', label: 'Opción 3', isFixed: false }
];

const opcionesPiso = [
    { value: 'opcion1', label: 'Opción 1', isFixed: false },
    { value: 'opcion2', label: 'Opción 2', isFixed: true },
    { value: 'opcion3', label: 'Opción 3', isFixed: false }
];

const customStyles = {
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#DA291C',
        color: 'white',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: 'white',
    }),
};
const menuStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }) // Asegura que el menú sea siempre visible

};

const TabComponent = () => {
    const { isVisible } = useVisibility();
    const [activeKey, setActiveKey] = useState('filtrosVisuales');
    const [selectedParticionHA, setSelectedParticionHA] = useState([]);
    const [selectedPiso, setSelectedPiso] = useState([]);

    const onSelect = (k) => {
        setActiveKey(k);
    };

    const getTabIcon = (key) => {
        if (key === 'filtrosVisuales') {
            return activeKey === 'filtrosVisuales' ? 'images/eyered.svg' : 'images/eyewhite.svg';
        } else if (key === 'barrasPedidos') {
            return activeKey === 'barrasPedidos' ? 'images/barrasred.svg' : 'images/barraswhite.svg';
        }
    };

    const tabStyle = {
        position: 'fixed',
        top: '35%',
        right: '50px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        width: '450px',
        height: '385px',
        overflow: 'auto',
        paddingBotton: '520px'
    };

    const tabContentStyle = {
        backgroundColor: 'white',
        borderRadius: '0 20px 20px 20px',
        padding: '15px',
        height: '100%',
        overflowY: 'auto'
    };

    const tabHeaderStyle = {
        borderRadius: '30px 30px 0 0',
    };

    const filasContenido ={
        marginTop: '15px'
    }
    const botonFiltroStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        marginTop: '25px'
    };
  
    const labelStyle = {
        marginBottom: '10px' // Estilo para el margen inferior de los labels
    };
    return isVisible ? (
        <div style={tabStyle}>
            <Tabs defaultActiveKey="filtrosVisuales" id="tab-component" onSelect={onSelect} style={tabHeaderStyle}>
                <Tab eventKey="filtrosVisuales" title={<span><img src={getTabIcon('filtrosVisuales')} alt="Icono Filtros Visuales" /> Filtros visuales</span>}>
                    <div style={tabContentStyle}>
                        <div className="filasContenido" style={filasContenido}>
                            <label htmlFor="particionHA" style={labelStyle}>Valores para AEC partición HA</label>
                            <Select
                                isMulti
                                options={opcionesParticionHA}
                                value={selectedParticionHA}
                                onChange={setSelectedParticionHA}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={{ ...customStyles, ...menuStyles }}
                                menuPortalTarget={document.body} // Renderiza el menú en el body del documento
                            />
                        </div>
                        <div className="filasContenido" style={filasContenido}>
                            <label htmlFor="piso" style={labelStyle}>Valores para AEC Piso</label>
                            <Select
                                isMulti
                                options={opcionesPiso}
                                value={selectedPiso}
                                onChange={setSelectedPiso}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={{ ...customStyles, ...menuStyles }}
                                menuPortalTarget={document.body} // Renderiza el menú en el body del documento
                          
                            />
                        </div>
                        <div className="filasContenido boton-filtro" style={botonFiltroStyle}>
                            <Button variant="contained" style={{ backgroundColor: '#DA291C', color: 'white' }}>
                                <img src='images/btnfiltrored.svg' alt="Icono Filtros Visuales" />
                                Aplicar Filtro
                            </Button>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="barrasPedidos" title={<span><img src={getTabIcon('barrasPedidos')} alt="Icono Barras y Pedidos" /> Barras & Pedidos</span>}>
                    <div style={tabContentStyle}>
                        {/* Contenido de la pestaña Barras & Pedidos */}
                    </div>
                </Tab>
            </Tabs>
        </div>
    ) : null;
};

export default TabComponent;
