import React from "react";
import SelectAtom from "../Atoms/SelectAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import IconAtom from "../Atoms/IconAtom";
import { faPlay, faSave } from "@fortawesome/free-solid-svg-icons";

const EditorHeaderMolecule = ({
  language,
  onLanguageChange,
  languages,
  onRun,
  onSave,
}) => (
  <div>
    <SelectAtom
      value={language}
      onChange={onLanguageChange}
      options={languages}
    />
    <ButtonAtom onClick={onRun}>
      <IconAtom icon={faPlay} />
    </ButtonAtom>
    <ButtonAtom onClick={onSave}>
      <IconAtom icon={faSave} />
    </ButtonAtom>
  </div>
);

export default EditorHeaderMolecule;
