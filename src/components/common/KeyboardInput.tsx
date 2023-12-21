import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { useState } from 'react';

const layouts = {
  defaultLayout: [
    "১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০",
    "দ ূ ী র ট এ ু ি ও প ে ো",
    "ৎ া স ড ত গ হ জ ক ল",
    "{shift} য় শ চ আ ব ন ম ৃ ্ ্র {bksp}",
    "{enbn} {space} {numeric}",
  ],
  shiftLayout: [
    "১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০",
    "ধ ঊ ঈ ড় ঠ ঐ উ ই ঔ ফ ৈ ৌ",
    "অ ষ ঢ থ ঘ ঃ ঝ খ ং র্",
    "{default} য ঢ় ছ ঋ ভ ণ ঙ ঞ ঁ ্য {bksp}",
    "{enbn} {space} {numeric}",
  ],
  englishLayout: [
    "1 2 3 4 5 6 7 8 9 0",
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "{shift} z x c v b n m {bksp}",
    "{enbn} {space} {numeric}"
  ],
  englishShiftLayout: [
    "1 2 3 4 5 6 7 8 9 0",
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{default} Z X C V B N M {bksp}",
    "{enbn} {space} {numeric}"
  ],
  numericLayout: [
    "১ ২ ৩", 
    "৪ ৫ ৬", 
    "৭ ৮ ৯", 
    "{enbn} ০ {bksp}"
  ]
};

const display = {
  "{enbn}": "En / Bn",
  "{bksp}": "⌫",
  "{shift}": "⇧",
  "{numeric}": "123",
  "{symbol}": "#+=",
  "{space}": "Space",
  "{switch}": "ABC",
  "{default}": "⇪"
};

interface keyboardParams {
    setValue: (param: string) => void;
}
const KeyboardInput: React.FC<keyboardParams> = ({setValue}) => {
    const [keyboard, setKeyboard] = useState({
      layoutName: "defaultLayout",
      input: ""
    });

    const onChange = (input: string) => {
      setKeyboard((prev) => ({ ...prev, input }));
      setValue(input);
    };

    const switchLayout = (button: string) => {
      let nextLayout = 'defaultLayout';
      if(button === '{enbn}'){
        if(keyboard.layoutName === "defaultLayout"){
          nextLayout ='englishLayout';
        } else {
          nextLayout ='defaultLayout';
        }
      } else if(button === '{numeric}') {
        nextLayout = 'numericLayout';
      } else if(button === '{shift}') {
        if(keyboard.layoutName === "defaultLayout"){
          nextLayout ='shiftLayout';
        } else {
          nextLayout ='englishShiftLayout';
        }
      } else if(button === '{default}') {
        if(keyboard.layoutName === "shiftLayout"){
          nextLayout ='defaultLayout';
        } else {
          nextLayout ='englishLayout';
        }
      }

      setKeyboard((prev) => ({ ...prev, layoutName: nextLayout }));
    }

    return (
        <>
          <Keyboard
            layoutName={keyboard.layoutName}
            layout={layouts}
            display={display}
            theme="hg-theme-default hg-layout-default"
            onChange={onChange}
            onKeyPress={(button) => {
              if (button === "{enbn}" || button === "{default}" || button === "{shift}" || button === "{numeric}" ) {
                // Toggle between layouts when the switch key is pressed
                switchLayout(button);
              }
            }}
          />
        </>
    )
}

export default KeyboardInput;
