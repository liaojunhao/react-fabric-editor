import React from 'react';
// import { SketchPicker } from 'react-color';
import { Saturation, ColorWrap } from 'react-color/lib/components/common';

interface Props {
  width: any;
  rgb: any;
  hex: any;
  hsv: any;
  hsl: any;
  onChange: any;
  onSwatchHover: any;
  disableAlpha: any;
  presetColors: any;
  renderers: any;
  styles?: {};
  className?: string;
}
const Sketch: React.FC<Props> = ({
  width,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  onSwatchHover,
  disableAlpha,
  presetColors,
  renderers,
  styles: passedStyles,
  className,
}) => {
  return (
    <div className="sketch-picker" style={{}}>
      <div style={{}}>
        <Saturation></Saturation>
      </div>
    </div>
  );
};

export default ColorWrap(Sketch);
