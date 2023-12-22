import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useVisibility } from '../../context/VisibilityContext';
const AdministradorDeVistas = ({ tabsRef }) => {
    const { isVisible } = useVisibility();
    const [vistaSeleccionada, setVistaSeleccionada] = useState(null);
    const [topPosition, setTopPosition] = useState('45%');
    const opcionesDeVistas = [
        { value: 'vista1', label: 'Vista 1' },
        { value: 'vista2', label: 'Vista 2' },
        { value: 'vista3', label: 'Vista 3' },
        { value: 'vista4', label: 'Vista 4' },
    ];

    useEffect(() => {
        const updatePosition = () => {
            if (tabsRef.current) {
                const tabsHeight = tabsRef.current.offsetHeight;
                const newPosition = `calc(35% + ${tabsHeight}px + 150px)`;
                setTopPosition(newPosition);
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);

        return () => window.removeEventListener('resize', updatePosition);
    }, [tabsRef]);

    const estiloDelComponente = {
        width: '450px',
        zIndex: 1000,
        position: 'fixed',
        top: topPosition,
        right: '50px',
        backgroundColor: '#DA291C',
        padding: '10px',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: 'white'
    };

    const estiloCabecera = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        marginLeft: '8px', // Agrega un margen a la izquierda del texto
    };
    const estiloSelect = {
        marginLeft: '10px', // Agrega un margen a la izquierda del select
    };
    const estiloBoton = {
        border: '2px solid white', // Borde blanco
        borderRadius: '20px', // Hacerlo redondeado
        backgroundColor: '#DA291C', // Color de fondo rojo
        color: 'white', // Letras blancas
        cursor: 'pointer',
        padding: '5px 10px', // Agrega un poco de relleno para que se vea mejor
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            border: '2px solid white', // Agrega un borde blanco
            borderRadius: '10px', // Redondea los bordes del select
            borderColor: '#DA291C', // Color del borde
            backgroundColor: 'white', // Fondo blanco
            color: '#DA291C', // Color del texto,
            height: '50px', // Establecer el alto del control
            minHeight: '50px' // Establecer la altura mínima para asegurar que no sea menor
        }),
        valueContainer: (provided) => ({
            ...provided,
            color: 'white', // Texto blanco siempre
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white', // Texto blanco siempre
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'white', // Icono del indicador blanco siempre
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            borderRadius: '0 10px 10px 0', // Redondea los bordes de la zona de indicadores
            backgroundColor: '#DA291C', // Fondo rojo
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: '#DA291C', // Color del separador de indicadores
        }),
        // Puedes agregar más estilos personalizados según sea necesario
    };

    const estiloImagenBoton = {
        marginRight: '15px', // Espacio entre el icono y el texto,
        color: 'white'
    };

    
    return isVisible ?(
        <div style={estiloDelComponente}>
            <div style={estiloCabecera}>
                <span>Administrador de Vistas</span>
                <button style={estiloBoton}>
                    <img src="images/masVista.svg" alt="Nueva Vista"   style={estiloImagenBoton}/> Nueva Vista
                </button>
            </div>
            <Select
                options={opcionesDeVistas}
                value={vistaSeleccionada}
                onChange={setVistaSeleccionada}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: 'rgba(255, 255, 255, 0.25)',
                        primary: 'white',
                    },
                })} styles={customSelectStyles}
            />
            <div style={{ height: '35px' }}></div>
        </div>
    ):null;
};

export default AdministradorDeVistas;
