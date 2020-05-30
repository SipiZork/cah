import React from 'react'

import { GroupContainer, FormInputContainer, FormInputLabel } from './form-input.styles'

const FormInput = ({ handleChange, label, labelFontSize, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabel className={otherProps.value.length ? 'shrink' : ''} fontSize={labelFontSize}>
        {label}
      </FormInputLabel>
      ) : null}
  </GroupContainer>
)

export default FormInput