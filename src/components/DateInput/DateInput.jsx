import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import React from 'react';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00/0000"
      definitions={{
        '#': /[1-13]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function DateInput({date, setDate}) {
  return (
      <FormControl fullWidth margin='normal' variant="filled">
        <InputLabel htmlFor="formatted-text-mask-input">Data de conclusão</InputLabel>
        <Input
          required
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
  );
}
