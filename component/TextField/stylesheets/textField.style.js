import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    minWidth: 240,
    minHeight: 54,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  textFieldContainer: {
    height: 54,
    paddingHorizontal: 8,
    paddingTop: 16,
    alignSelf: 'stretch',
  },
  labelWrapper: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  bottomBorder: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
  },
  helperTextWrapper: {
    alignSelf: 'stretch',
    paddingHorizontal: 8,
  },
  helperText: {
    paddingTop: 4,
    fontSize: 12,
  },
  disabledBottomBorder: {
    backgroundColor: '#999',
  },
  disabledLabel: {
    color: '#999'
  }
})