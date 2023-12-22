import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ListadoProyectos = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

  const handleListItemClick = (proyecto) => {
    setProyectoSeleccionado(proyecto);
  };

  // Genera las opciones para la lista
  const opcionesProyectos = [];
  for (let i = 1; i <= 15; i++) {
    const isSelected = proyectoSeleccionado === `Proyecto ${i}`;
    opcionesProyectos.push(
      <ListItem 
        button
        selected={isSelected}
        onClick={() => handleListItemClick(`Proyecto ${i}`)}
        style={{ 
          backgroundColor: isSelected ? '#DA291C' : 'transparent',
          color: isSelected ? '#FFF' : 'inherit' // Cambio de color de texto para el elemento seleccionado
        }}
      >
        <ListItemText primary={`Proyecto_${i}.rvt`} />
      </ListItem>
    );
  }

  const cardStyle = {
    marginTop: '25px',
    marginLeft: '50px',
    marginRight: '50px',
    borderRadius: '20px', // Bordes redondeados
  };

  const buttonStyle = {
    backgroundColor: '#DA291C', // Color de fondo
    color: '#FFF', // Color de texto
    marginRight: '10px', // Espacio entre los botones
    borderRadius: '10px'
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="images/proyectosListadoIcn.svg" alt="Icono" style={{ marginRight: '10px' }} />
          <Typography variant="h6" style={{ fontSize: 14, fontWeight: 'bold' }}>
            Proyectos
          </Typography>
        </div>
        <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '35px' }}>
          Directorio de Proyectos Disponibles
        </Typography>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" style={buttonStyle}>
            <img src="images/uploadIcn.svg" alt="Upload" style={{ marginRight: '5px' }} />
            Upload
          </Button>
          <Button variant="contained" style={buttonStyle}>
            <img src="images/uploadIcn.svg" alt="Traducir" style={{ marginRight: '5px' }} />
            Traducir
          </Button>
          <Button variant="contained" style={buttonStyle}>
            <img src="images/uploadIcn.svg" alt="Eliminar" style={{ marginRight: '5px' }} />
            Eliminar
          </Button>
        </div>
        <List>
          {opcionesProyectos}
        </List>
      </CardContent>
    </Card>
  );
};

export default ListadoProyectos;
