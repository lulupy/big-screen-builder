
import React from 'react'
import { SketchPicker } from 'react-color'
import './index.css';

interface IProps {
  value?: string,
  onChange?: (value: string) => void,
  onBlur?: () => void,
}

const ColorPicker = ({ value, onChange, onBlur }: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    onBlur && onBlur();
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    onChange && onChange(color.hex);
  };

  return (
    <>
      <div className='color-picker'>
        <div className="swatch" onClick={ handleClick }>
          <div className="color" style={{ backgroundColor: value }} />
        </div>
        { displayColorPicker ? <div className="popover">
          <div className="cover" onClick={ handleClose }/>
          <SketchPicker disableAlpha color={value} onChange={ handleChange } />
        </div> : null }

      </div>
    </>
  )
}

export default ColorPicker;