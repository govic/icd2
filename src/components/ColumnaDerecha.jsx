import React, { useRef } from 'react';
import Viewer from './Viewer';
import TabsComponent from './TabsComponent';
import AdministradorDeVistas from './visualizador/AdministradorDeVistas';
import Paleta from './visualizador/Paleta';
import HeaderApp from './HeaderApp';

const ColumnaDerecha = ({ isCollapsed, token, urn, selectedIds, onCameraChange, onSelectionChange, refViewer }) => {
    const estiloColapsado = {
        width: '100%',
    };

    const estiloExpandido = {
        width: '100%',
    };

    const estiloActual = isCollapsed ? estiloColapsado : estiloExpandido;
    const tabsRef = useRef(null);

    return (
        <div style={estiloActual}>
            <HeaderApp /> {/* Instancia el componente HeaderApp aquí */}
           
            <div style={{ position: 'fixed', top: '64px', width: '100%', height: '88%', marginBottom: '30px' }}>
                <Viewer
                    runtime={{ accessToken: token }}
                    urn={urn}
                    selectedIds={selectedIds}
                    onCameraChange={onCameraChange}
                    onSelectionChange={onSelectionChange}
                    ref={refViewer}
                />
                <div ref={tabsRef}>
                    <TabsComponent /> {/* Instanciar TabsComponent */}
                </div>
                <AdministradorDeVistas tabsRef={tabsRef} /> {/* Pasar la ref a AdministradorDeVistas */}
                <Paleta /> {/* Instanciar Paleta aquí */}
            </div>
        </div>
    );
};

export default ColumnaDerecha;
