import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../../store'
const ColorPicker = () => {

  const snap =useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
      color={snap.color}
      disableAlpha
     /* presetColors={[
        '#ccc',        // Default color
        '#EFBD4E',     // Yellow
        '#80C670',     // Green
        '#3498db',     // Blue
        '#e74c3c',     // Red
        '#9b59b6',     // Purple
        '#f39c12',     // Orange
        '#1abc9c',     // Turquoise
        '#34495e',     // Dark Gray
        '#2ecc71',     // Emerald
        '#e67e22',     // Carrot
        '#2980b9',     // Belize Hole
        '#c0392b',     // Pomegranate
        '#8e44ad',     // Wisteria
        '#d35400',     // Pumpkin
        '#7f8c8d',     // Silver
        '#16a085',     // Green Sea
        '#27ae60',     // Nephritis
        '#c0392b',     // Alizarin
        '#d35400',     // Pumpkin
        '#3498db',     // Peter River
        '#1abc9c',     // Turquoise
        '#e74c3c',     // Alizarin
        '#95a5a6',     // Concrete
        '#9b59b6',     // Amethyst
        '#f39c12',     // Orange
        '#3498db',     // Peter River
        '#2ecc71'      // Emerald
        // Add more colors as needed
      ]}    */
      onChange={(color) => state.color = color.hex}


    />
        
    </div>
  )
}

export default ColorPicker
