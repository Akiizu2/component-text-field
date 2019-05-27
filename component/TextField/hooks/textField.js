import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

const FIELD_STATE = {
  FOCUS: 'focus',
  BLUR: 'blur',
}

const fieldAnimate = new Animated.Value(1)

function useFieldAnimate(props) {

  const { fieldState, value } = props

  const runAnimation = (value) => {
    Animated.timing(fieldAnimate, {
      toValue: value,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      duration: 240,
    }).start()
  }

  useEffect(() => {
    if (fieldState === FIELD_STATE.BLUR && !value) {
      runAnimation(1)
    } else if (fieldState === FIELD_STATE.FOCUS || value) {
      runAnimation(0)
    }
    return () => { }
  }, [fieldState])

  const labelPositionY = fieldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  })

  const labelPositionX = fieldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  })

  const labelScale = fieldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [0.84, 1],
  })

  const borderBottomAnimatedeSize = fieldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 2],
  })

  const labelAnimatedStyleWrapper = {
    top: labelPositionY,
    left: labelPositionX,
  }

  const labelAnimatedStyle = {
    transform: [{ scale: labelScale }]
  }

  const borderBottomStyle = {
    height: borderBottomAnimatedeSize,
  }

  return {
    labelAnimatedStyleWrapper,
    labelAnimatedStyle,
    borderBottomStyle,
  }
}

export { FIELD_STATE, useFieldAnimate }