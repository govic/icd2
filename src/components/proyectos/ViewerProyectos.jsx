import React from 'react';
import PropTypes from 'prop-types';
import '../../extensions/FiltrosVisuales.js';  
import '../../extensions/HandleSelectionExtension.js';
const { Autodesk } = window;

const runtime = {
    /** @type {Autodesk.Viewing.InitializerOptions} */
    options: null,
    /** @type {Promise<void>} */
    ready: null
};

function initializeViewerRuntime(options) {
    if (!runtime.ready) {
        runtime.options = { ...options };
        runtime.ready = new Promise((resolve) => Autodesk.Viewing.Initializer(runtime.options, resolve));
    } else {
        if (['accessToken', 'getAccessToken', 'env', 'api', 'language'].some(prop => options[prop] !== runtime.options[prop])) {
            return Promise.reject('Cannot initialize another viewer runtime with different settings.');
        }
    }
    return runtime.ready;
}

class ViewerProyectos extends React.Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.viewer = null;
    }

    componentDidMount() {
        initializeViewerRuntime(this.props.runtime || {})
            .then(_ => {
                this.viewer = new Autodesk.Viewing.GuiViewer3D(this.container, {
                    // Configuraciones adicionales si son necesarias
                });
                this.viewer.start();
                this.loadExtensions();
                this.addEventListeners();
                this.updateViewerState({});
            })
            .catch(err => console.error('Error al inicializar el Viewer:', err));
    }

    componentWillUnmount() {
        this.removeEventListeners();
        if (this.viewer) {
            this.viewer.finish();
            this.viewer = null;
        }
    }

    componentDidUpdate(prevProps) {
        this.updateViewerState(prevProps);
    }

    loadExtensions() {
        this.viewer.loadExtension('FiltrosVisuales');
        this.viewer.loadExtension('HandleSelectionExtension');
    }

    addEventListeners() {
        this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, this.onViewerCameraChange);
        this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onViewerSelectionChange);
    }

    removeEventListeners() {
        this.viewer.removeEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, this.onViewerCameraChange);
        this.viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onViewerSelectionChange);
    }

    updateViewerState(prevProps) {
        // Lógica para actualizar el estado del viewer
    }

    onViewerCameraChange = () => {
        if (this.props.onCameraChange) {
            this.props.onCameraChange({ viewer: this.viewer, camera: this.viewer.getCamera() });
        }
    }

    onViewerSelectionChange = () => {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange({ viewer: this.viewer, ids: this.viewer.getSelection() });
        }
    }

    render() {
        const viewerStyle = {
            width: '100%', // Ajuste del ancho
            height: '100%', // Ajuste de la altura
            // Puedes agregar más estilos aquí
        };

        return <div ref={ref => this.container = ref} style={viewerStyle} />;
    }
}

ViewerProyectos.propTypes = {
    runtime: PropTypes.object,
    urn: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    onCameraChange: PropTypes.func,
    onSelectionChange: PropTypes.func
};

export default ViewerProyectos;
