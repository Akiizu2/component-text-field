import { useEffect } from 'react'
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

  const interpolater = (outputRange) => fieldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange,
  })

  const labelPositionY = interpolater([0, 8])
  const labelPositionX = interpolater([4, 8])
  const labelScale = interpolater([0.84, 1])
  const borderBottomAnimatedeSize = interpolater([2, 1])

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