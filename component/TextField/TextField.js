import React, { memo, useState } from 'react'
import {
  TextInput,
  Text,
  View,
  Animated,
} from 'react-native'

import { hooks } from './hooks'
import { textFieldStyles as styles } from './stylesheets'

const { FIELD_STATE, useFieldAnimate } = hooks

function TextField(props) {

  const {
    label,
    color,
    disabled,
    containerStyle,
    helperText,
    labelTextStyle,
    helperTextStyle,
    value: intialValue,
  } = props

  const [fieldState, setFieldState] = useState(FIELD_STATE.BLUR)
  const [value, setValue] = useState(intialValue)

  const {
    labelAnimatedStyleWrapper,
    labelAnimatedStyle,
    borderBottomStyle,
  } = useFieldAnimate({ fieldState, value })

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.labelWrapper,
          labelAnimatedStyleWrapper
        ]}
      >
        <Animated.Text style={[
          labelAnimatedStyle,
          disabled ? styles.disabledLabel : { color },
          labelTextStyle
        ]}>{label}</Animated.Text>
      </Animated.View>
      <TextInput
        editable={!disabled}
        onFocus={() => setFieldState(FIELD_STATE.FOCUS)}
        onBlur={() => setFieldState(FIELD_STATE.BLUR)}
        onChangeText={setValue}
        style={[styles.textFieldContainer, containerStyle]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bottomBorder,
          borderBottomStyle,
          disabled
            ? styles.disabledBottomBorder
            : { backgroundColor: color }
        ]}
      />
      {!!helperText &&
        <View
          pointerEvents="none"
          style={[styles.helperTextWrapper]}
        >
          <Text style={[
            styles.helperText,
            disabled
              ? styles.disabledLabel
              : { color },
            helperTextStyle,
          ]}>{helperText}</Text>
        </View>
      }
    </View>
  )
}

TextField.defaultProps = {
  trailingIcon() { },
  helperText() { },
  label: 'Label',
  value: '',
  disabled: false,
  helperText: '',
  containerStyle: {},
  labelTextStyle: {},
  helperTextStyle: {},
  color: '#333',
}

export default memo(TextField)
