import { ErrorMessage, Field } from 'formik'
import React from 'react'
import './input.css'
import { Box,  Input as ChakraInput, FormLabel } from '@chakra-ui/react'

export const Input = ({children, htmlFor, type, id, placeholder, name}) => {
  return (
    <Field name={name}>
        {({field, form: {touched, errors}}) => (
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" mb="20px ">
                <FormLabel htmlFor={htmlFor}>{children}</FormLabel>
                <Box  bg="gray.100" mb="5px">
                  <ChakraInput {...field} type={type} id={id} placeholder={placeholder} 
                  borderColor={errors[field.name] && touched[field.name] ? 'red.500' : 'gray.300'}
                   />

                </Box>

                <ErrorMessage name={name}>
                    {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
            </Box>
        )}

        
    </Field>
  )
}

export default Input