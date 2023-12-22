import React, { useEffect } from 'react';
import Viewer from './Viewer';
import HeaderApp from './HeaderApp';
import ListadoProyectos from './proyectos/ListadoProyectos';
import AdministracionProyecto from './proyectos/AdministracionProyecto';
import ProyectosUsuarios from './proyectos/ProyectosUsuarios';
const Proyectos = ({ token, urn, selectedIds, onCameraChange, onSelectionChange }) => {
    const estiloProyectos = {
        backgroundColor: '#D8D8D8',
        padding: '20px',
        height: 'calc(100vh - 64px)',
        overflowY: 'scroll',
    };

    const estiloViewerContainer = {
          };

         

    const estiloAdministracionProyecto = {
     
        // Otros estilos necesarios para AdministracionProyecto
        marginLeft: '400px',
        with: '100%',
        marginTop: '-25px',
        height: '100%'
    };

    useEffect(() => {
        // Ajustes de estilo para el Viewer
        const updateViewerStyle = () => {
            const viewerElement = document.querySelector('.adsk-viewing-viewer');
            if (viewerElement) {
                viewerElement.style.height = '400px'; // Ajusta la altura
                viewerElement.style.width = '20%'; // Ajusta el ancho
                viewerElement.style.overflow = 'hidden';
                viewerElement.style.marginTop = '25px';
            }
        };

        updateViewerStyle();

        window.addEventListener('resize', updateViewerStyle);
        return () => {
            window.removeEventListener('resize', updateViewerStyle);
        };
    }, []);

    return (
        <div>
            <HeaderApp />
            <div style={estiloProyectos}>
                <div className='row'>
                    <div className='col-6' >
                        <ListadoProyectos /> {/* Instanciar ListadoProyectos */}
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-6' style={estiloViewerContainer}>
                                <Viewer 
                                    runtime={{ accessToken: token }}
                                    urn={urn}
                                    selectedIds={selectedIds}
                                    onCameraChange={onCameraChange}
                                    onSelectionChange={onSelectionChange}
                                />
                            </div>
                            <div className='col-6' style={estiloAdministracionProyecto}>
                                <AdministracionProyecto /> {/* Instanciar AdministracionProyecto */}
                            </div>
                        </div>
                        <div className='row'>
                               <div className='col-12'  >
                                <ProyectosUsuarios  /> {/* Instanciar AdministracionProyecto */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proyectos;
