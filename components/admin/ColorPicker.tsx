import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  onPickerChange: (color: string) => void;
  value?: string;
}

const ColorPicker = ({ onPickerChange, value }: Props) => {
  return (
    <div className="relative">
        <div className="flex flex-row items-center">
            <p>#</p>
            <HexColorInput color={value} onChange={onPickerChange} className="hex-input" />
        </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
